import React, { useState, useEffect, useRef } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import * as cam from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Hands } from "@mediapipe/hands";
import moment from "moment";

const CourseExam = ({ course, questions, auth, cheatingBanUntil }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [cheatingDetected, setCheatingDetected] = useState(false);
    const [warnings, setWarnings] = useState(0);
    const [cameraPermissionGranted, setCameraPermissionGranted] =
        useState(false);
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(course.exam_duration * 60); // in seconds

    const videoRef = useRef(null);
    const cameraRef = useRef(null);
    const headMovingCounter = useRef(0);
    const facePositionHistory = useRef([]);
    const warningTimeoutRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        answers: questions.map((q) => ({
            questionId: q.id,
            selectedOption: null,
        })),
    });

    // 👇 Add these inside your React component (e.g., CourseExam)
    const handWarningRef = useRef(null);
    const [handDetected, setHandDetected] = useState(false);

    // 👇 Add this function inside your component, e.g., below onResults()
    const onHandResults = (results) => {
        if (
            results.multiHandLandmarks &&
            results.multiHandLandmarks.length > 0
        ) {
            if (!handDetected) {
                setHandDetected(true);
                alert("⚠ Suspicious Activity: Hand Detected");

                // Increase warning count or flag cheating
                if (warnings < 3 && !handWarningRef.current) {
                    setWarnings((prev) => prev + 1);
                    handWarningRef.current = setTimeout(() => {
                        handWarningRef.current = null;
                        setHandDetected(false);
                    }, 10000); // 10-second cooldown
                } else if (warnings >= 3) {
                    setCheatingDetected(true);
                }
            }
        } else {
            setHandDetected(false);
        }
    };

    // 👇 Full useEffect for initializing MediaPipe Hands tracking
    useEffect(() => {
        if (!cameraPermissionGranted || !examStarted) return;

        const hands = new Hands({
            locateFile: (file) =>
                ` https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        hands.onResults(onHandResults);

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        width: 640,
                        height: 480,
                        facingMode: "user",
                    },
                })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                        const camera = new cam.Camera(videoRef.current, {
                            onFrame: async () => {
                                await hands.send({ image: videoRef.current });
                            },
                            width: 640,
                            height: 480,
                        });
                        camera.start();
                    }
                })
                .catch((err) => {
                    console.error("Hand tracking camera error:", err);
                    setCheatingDetected(true);
                });
        }

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, [cameraPermissionGranted, examStarted]);

    // 🚨 Timer countdown
    useEffect(() => {
        if (!examStarted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examStarted]);

    // 🚨 Cancel Exam if Cheating
    useEffect(() => {
        if (cheatingDetected) {
            if (cameraRef.current) cameraRef.current.stop();
            router.post(`/courses/${course.id}/exam/cancel`, {
                reason: "Cheating detected",
            });
        }
    }, [cheatingDetected]);

    // 🚨 Tab Switch Detection
    useEffect(() => {
        if (!examStarted) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setCheatingDetected(true);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [examStarted]);

    // 🚨 Camera Permission Detection
    useEffect(() => {
        if (!examStarted) return;

        const checkCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                setCameraPermissionGranted(true);
            } catch (err) {
                setCheatingDetected(true);
            }
        };

        const interval = setInterval(checkCameraPermission, 5000);
        return () => clearInterval(interval);
    }, [examStarted]);

    // 🚨 Head Movement Detection with MediaPipe
    useEffect(() => {
        if (!cameraPermissionGranted || !examStarted) return;

        const faceMesh = new FaceMesh({
            locateFile: (file) =>
                `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMesh.onResults(onResults);

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        width: 640,
                        height: 480,
                        facingMode: "user",
                    },
                })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }

                    cameraRef.current = new cam.Camera(videoRef.current, {
                        onFrame: async () => {
                            await faceMesh.send({ image: videoRef.current });
                        },
                        width: 640,
                        height: 480,
                    });
                    cameraRef.current.start();
                })
                .catch((err) => {
                    console.error("Camera error: ", err);
                    setCheatingDetected(true);
                });
        }

        return () => {
            if (cameraRef.current) {
                cameraRef.current.stop();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, [cameraPermissionGranted, examStarted]);

    const onResults = (results) => {
        if (
            results.multiFaceLandmarks &&
            results.multiFaceLandmarks.length > 0
        ) {
            const landmarks = results.multiFaceLandmarks[0];

            // Track nose position (landmark 1)
            const nose = landmarks[1];
            const leftEye = landmarks[33];
            const rightEye = landmarks[263];

            // Calculate head position metrics
            const headTilt = Math.abs(leftEye.y - rightEye.y);
            const headPositionX = nose.x;

            // Store recent positions
            facePositionHistory.current.push({
                x: headPositionX,
                tilt: headTilt,
                timestamp: Date.now(),
            });

            // Keep only the last 30 frames (~1 second at 30fps)
            facePositionHistory.current =
                facePositionHistory.current.slice(-30);

            // Detect significant deviation from center
            if (headPositionX < 0.3 || headPositionX > 0.7 || headTilt > 0.1) {
                headMovingCounter.current += 1;
            } else {
                headMovingCounter.current = Math.max(
                    0,
                    headMovingCounter.current - 1
                );
            }

            // Detect sudden movements
            if (facePositionHistory.current.length > 10) {
                const recent = facePositionHistory.current.slice(-10);
                const avgX =
                    recent.reduce((sum, pos) => sum + pos.x, 0) / recent.length;
                const variance =
                    recent.reduce(
                        (sum, pos) => sum + Math.pow(pos.x - avgX, 2),
                        0
                    ) / recent.length;

                if (variance > 0.01) {
                    // Threshold for sudden movements
                    headMovingCounter.current += 5;
                }
            }

            // Trigger warning or cheating detection
            if (headMovingCounter.current > 20) {
                if (warnings < 3) {
                    if (!warningTimeoutRef.current) {
                        setWarnings((prev) => prev + 1);
                        warningTimeoutRef.current = setTimeout(() => {
                            warningTimeoutRef.current = null;
                        }, 10000); // 10 second cooldown between warnings
                    }
                } else {
                    setCheatingDetected(true);
                }
            }
        } else {
            // No face detected - possible cheating
            headMovingCounter.current += 1;
            if (headMovingCounter.current > 30) {
                setCheatingDetected(true);
            }
        }
    };

    const requestCameraAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                    facingMode: "user",
                },
            });
            stream.getTracks().forEach((track) => track.stop());
            setCameraPermissionGranted(true);
            setExamStarted(true);
        } catch (err) {
            alert(
                "Camera access is required to take this exam. Please enable camera permissions."
            );
        }
    };

    // Exam Form Handlers
    const handleOptionChange = (questionId, optionId) => {
        setData((prevData) => ({
            ...prevData,
            answers: prevData.answers.map((a) =>
                a.questionId === questionId
                    ? { ...a, selectedOption: optionId }
                    : a
            ),
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitExam = () => {
        if (cameraRef.current) cameraRef.current.stop();
        post(`/courses/${course.id}/exam/submit`, data);
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = data.answers.find(
        (a) => a.questionId === currentQuestion.id
    )?.selectedOption;

    // Format time display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const now = new Date();
    const banUntil = cheatingBanUntil ? new Date(cheatingBanUntil) : null;
    const isBanActive = banUntil && banUntil > now;
    console.log({ cheatingBanUntil, banUntil, isBanActive });

    if (!examStarted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar auth={auth} />
                <Head title="Course Exam" />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                                {course.course_title} Exam
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Please read the instructions carefully before
                                starting
                            </p>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                                    <svg
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Exam Rules
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        You must keep your camera on at all
                                        times. Looking away from the screen or
                                        switching tabs will result in exam
                                        termination.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                                    <svg
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Time Limit
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        You have {course.exam_duration} minutes
                                        to complete this exam. The timer will
                                        start when you begin.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                                    <svg
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Cheating Detection
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        Our system will monitor your head
                                        movements and browser activity.
                                        Excessive movement or tab switching will
                                        result in warnings or exam termination.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={requestCameraAccess}
                                className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
                            >
                                Start Exam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar auth={auth} />
            <Head title="Exam" />
            {isBanActive ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-lg text-center">
                        <p className="text-base font-medium">
                            You are temporarily banned due to suspicious
                            activity. Please try again after{" "}
                            <span className="font-semibold">
                                {moment(banUntil).format("DD-MM-YYYY")}
                            </span>
                            .
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col min-h-screen bg-gray-50">
                    {/* Exam Header */}
                    <div className="bg-blue-700 text-white py-4 px-6 shadow-md">
                        <div className="container mx-auto flex justify-between items-center">
                            <h1 className="text-xl sm:text-2xl font-bold">
                                {course.course_title} Exam
                            </h1>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center bg-blue-800 px-4 py-2 rounded-full">
                                    <svg
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="font-semibold">
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                                {warnings > 0 && (
                                    <div className="flex items-center bg-red-100 px-4 py-2 rounded-full text-red-800">
                                        <svg
                                            className="h-5 w-5 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span className="font-semibold">
                                            Warning: {warnings}/3
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Exam Content */}
                    <div className="flex-1 p-4 sm:p-6 container mx-auto">
                        <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-gray-200">
                            {/* Left Column - Question */}
                            <div className="flex-1 p-6 sm:p-8 flex flex-col">
                                <div className="mb-6">
                                    <h2 className="text-sm sm:text-base text-blue-700 font-semibold mb-2">
                                        Question {currentQuestionIndex + 1} of{" "}
                                        {questions.length}
                                    </h2>
                                    <p className="text-gray-800 text-lg sm:text-xl font-medium leading-relaxed">
                                        {currentQuestion.question_text}
                                    </p>
                                </div>

                                {/* Camera Preview for Cheating Detection */}
                                <div className="mt-auto">
                                    <div className="relative bg-gray-100 rounded-xl overflow-hidden w-full max-w-md mx-auto border-2 border-gray-300">
                                        <video
                                            ref={videoRef}
                                            className="w-full h-auto"
                                            autoPlay
                                            muted
                                            playsInline
                                        ></video>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-2 h-2 rounded-full mr-2 ${
                                                        cameraPermissionGranted
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    }`}
                                                ></div>
                                                <span>Proctoring Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Options */}
                            <div className="bg-gray-50 w-full md:w-[40%] p-6 sm:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                                <p className="uppercase tracking-widest text-xs text-gray-500 mb-4">
                                    Select your answer
                                </p>
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option) => {
                                        const isSelected =
                                            currentAnswer === option.id;
                                        return (
                                            <label
                                                key={option.id}
                                                htmlFor={`option-${option.id}`}
                                                className={`flex items-center gap-3 border-2 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                                                    isSelected
                                                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                                }`}
                                            >
                                                <input
                                                    id={`option-${option.id}`}
                                                    type="radio"
                                                    name={`question-${currentQuestion.id}`}
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        handleOptionChange(
                                                            currentQuestion.id,
                                                            option.id
                                                        )
                                                    }
                                                    className="w-5 h-5 accent-blue-600"
                                                />
                                                <span className="text-gray-700 font-medium text-sm sm:text-base">
                                                    {option.option_text}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-wrap justify-between items-center mt-8">
                            <div className="text-sm text-gray-600">
                                {warnings > 0 && (
                                    <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
                                        <svg
                                            className="h-4 w-4 text-yellow-600 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span>
                                            Warning: {warnings}/3 - Keep your
                                            face centered
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap justify-end items-center gap-3 mt-4 sm:mt-0">
                                <button
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm ${
                                        currentQuestionIndex === 0
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                                    }`}
                                >
                                    Previous
                                </button>

                                {currentQuestionIndex ===
                                questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmitExam}
                                        disabled={processing}
                                        className="px-6 py-2.5 rounded-full font-medium bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50 transition-all text-sm"
                                    >
                                        {processing
                                            ? "Submitting..."
                                            : "Submit Exam"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="px-6 py-2.5 rounded-full font-medium bg-blue-700 hover:bg-blue-800 text-white transition-all text-sm"
                                    >
                                        Next Question
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseExam;
