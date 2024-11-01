<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class WebPurifyService
{
    protected $client;
    protected $apiKey;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apiKey = '919afb0830476fb3b50f58591e0aec95'; // Your API Key
    }

    public function moderateText($text)
    {
        $url = 'http://api1.webpurify.com/services/rest/';

        try {
            $response = $this->client->get($url, [
                'query' => [
                    'api_key' => $this->apiKey,
                    'method' => 'webpurify.live.check', // The moderation method
                    'text' => $text,
                ]
            ]);

            $xml = simplexml_load_string($response->getBody()->getContents());

            if ((string) $xml->found === '1') {
                $terms = (array) $xml->terms;
                return [
                    'status' => 'contains_profanity',
                    'terms' => $terms
                ];
            }

            return ['status' => 'clean'];
        } catch (GuzzleException $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}
