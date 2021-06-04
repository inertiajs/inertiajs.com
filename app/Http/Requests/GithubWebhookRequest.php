<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GithubWebhookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $secret = config('services.github.webhook_secret');
        if (is_null($secret)) {
            return true;
        }

        $signature = $this->headers->get('X-Hub-Signature-256', '');
        $hash = 'sha256=' . hash_hmac('sha256', (string) $this->getContent(), $secret);

        return hash_equals($hash, $signature);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
