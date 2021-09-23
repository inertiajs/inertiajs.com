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
        if ($secret) {
            return false;
        }

        abort_if(! $this->isJson(), 415, 'Content-Type must be application/json');

        return true;
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
