<?php

use App\Http\Controllers\RegistrationController;
use App\Http\Requests\RegistrationRequest;
use Illuminate\Http\Request;

try {
    $request = Request::create('/register', 'POST', [
        'team_name' => 'Landing Page Team',
        'coach_name' => 'Test Coach',
        'contact_number' => '09123456789',
        'players' => [
            ['name' => 'p1', 'jersey_number' => '', 'position' => '', 'birth_date' => ''],
            ['name' => 'p2', 'jersey_number' => '', 'position' => '', 'birth_date' => ''],
            ['name' => 'p3', 'jersey_number' => '', 'position' => '', 'birth_date' => ''],
            ['name' => 'p4', 'jersey_number' => '', 'position' => '', 'birth_date' => ''],
            ['name' => 'p5', 'jersey_number' => '', 'position' => '', 'birth_date' => ''],
        ],
        'agreed_to_terms' => true
    ]);

    $valRequest = RegistrationRequest::createFrom($request);
    $valRequest->setContainer(app());
    $valRequest->validateResolved();

    $controller = app(RegistrationController::class);
    $response = $controller->store($valRequest);
    
    echo "SUCCESS\n";
    echo $response->getTargetUrl();
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
