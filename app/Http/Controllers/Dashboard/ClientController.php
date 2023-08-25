<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Interfaces\Clients\ClientRepositoryInterface;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    private $Clients;

    public function __construct(ClientRepositoryInterface $Clients)
    {
        $this->Clients = $Clients;
    }

    public function index()
    {
        return $this->Clients->index();
    }

    public function store(Request $request)
    {
        return $this->Clients->store($request);
    }

    public function update(Request $request)
    {
        return $this->Clients->update($request);
    }


    public function destroy(Request $request)
    {
        return $this->Clients->destroy($request);
    }

}
