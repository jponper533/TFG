<?php

namespace App\Enums;

enum RoleSlug: string
{
    case ADMIN = 'admin';
    case PROF = 'profe';
    case ALUM = 'alum';
}