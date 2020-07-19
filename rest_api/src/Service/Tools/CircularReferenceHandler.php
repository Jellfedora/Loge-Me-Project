<?php

namespace App\Service\Tools;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        return $object->getId();
    }
}
