<?php

namespace App\Services\Discord\Exceptions;

use Illuminate\Http\Client\RequestException;
use RuntimeException;
use Throwable;

class InvalidAuthorizationException extends RuntimeException
{
    /**
     * The underlying Exception.
     */
    public ?Throwable $originalException = null;

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
