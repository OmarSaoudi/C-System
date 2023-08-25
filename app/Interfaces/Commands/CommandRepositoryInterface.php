<?php
namespace App\Interfaces\Commands;


interface CommandRepositoryInterface
{

    // get All Commands
    public function index();

    // create Commands
    public function create();

    // store Commands
    public function store($request);

    // show Commands
    public function show($id);

    // edit Commands
    public function edit($id);

    // update Command
    public function update($request);

    // destroy Command
    public function destroy($request);

}
