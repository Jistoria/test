<?php

namespace App\Services\Auth;

use App\Models\User;

class AuthService
{
    public function __construct(
        protected User $user
    )
    {

    }

    public function register(array $data): User
    {
        return $this->user->create($data);
    }

    public function login(array $data): array
    {
        $user = $this->user->where('email', $data['email'])->first();

        if (!$user || !password_verify($data['password'], $user->password)) {
            throw new \Exception('Invalid credentials');
        }

        return [
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ];
    }

    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }
}
