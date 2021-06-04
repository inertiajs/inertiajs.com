<?php

namespace App\Services\Discord\Exceptions;

use Exception;
use Illuminate\Http\Client\RequestException;
use RuntimeException;

class InvalidAuthorizationException extends RuntimeException
{
    /**
     * The underlying Exception.
     */
    public ?Exception $originalException = null;

    /**
     * Create a new instance of InvalidAuthorizationException using a RequestException.
     *
     * @param RequestException $exception
     * @return InvalidAuthorizationException
     */
    public static function fromRequestException(RequestException $exception): self
    {
        $instance = new self($exception->getMessage());
        $instance->originalException = $exception;

        return $instance;
    }
}
