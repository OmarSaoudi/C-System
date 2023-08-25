<?php
namespace App\Interfaces\Clients;


interface ClientRepositoryInterface
{

    // get Client
    public function index();

    // store Client
    public function store($request);

    // Update Client
    public function update($request);

    // destroy Client
    public function destroy($request);

}
