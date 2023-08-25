<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Interfaces\Commands\CommandRepositoryInterface;
use Illuminate\Http\Request;

class CommandController extends Controller
{
    private $Commands;

    public function __construct(CommandRepositoryInterface $Commands)
    {
        $this->Commands = $Commands;
    }

    public function index()
    {
        return $this->Commands->index();
    }

    public function create()
    {
        return $this->Commands->create();
    }


    public function store(Request $request)
    {
        return $this->Commands->store($request);
    }

    public function show($id)
    {
        return $this->Commands->show($id);
    }

    public function edit($id)
    {
        return $this->Commands->edit($id);
    }

    public function update(Request $request)
    {
        return $this->Commands->update($request);
    }


    public function destroy(Request $request)
    {
        return $this->Commands->destroy($request);
    }
}
