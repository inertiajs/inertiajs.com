<?php

namespace Tests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Collection;
use Illuminate\Testing\TestResponse;
use PHPUnit\Framework\Assert as PHPUnit;
use ReflectionClass;
use ReflectionNamedType;
use ReflectionParameter;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();

        // TODO: Release as separate/well-tested package, or incorporate as part of Laravel/Framework.
        TestResponse::macro('assertUsesFormRequest', function (string $className) {
            if ($className !== FormRequest::class && ! is_subclass_of($className, FormRequest::class)) {
                PHPUnit::fail("Class [$className] is not a Form Request.");
            }

            // TODO: Create PR to Laravel/Framework that allows access of the request/route on the TestResponse.
            $route = request()->route();

            $reflection = new ReflectionClass($route->controller);
            $action = $reflection->getMethod($route->getActionMethod());

            $exists = Collection::make($action->getParameters())->contains(function (ReflectionParameter $parameter) use ($className) {
                $type = $parameter->getType();

                return $type instanceof ReflectionNamedType && $type->getName() === $className;
            });

            PHPUnit::assertTrue($exists, "Request does not use Form Request [$className].");
        });
    }
}
