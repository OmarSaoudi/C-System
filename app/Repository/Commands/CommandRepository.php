<?php
namespace App\Repository\Commands;

use App\Interfaces\Commands\CommandRepositoryInterface;
use App\Models\Car;
use App\Models\Command;
use App\Models\Client;
use App\Models\Bank;


class CommandRepository implements CommandRepositoryInterface
{

    public function index()
    {
      $commands = Command::all();
      return view('Dashboard.commands.index', compact('commands'));
    }

    public function create()
    {
        $clients = Client::all();
        $banks = Bank::all();
        return view('Dashboard.commands.add', compact('clients','banks'));
    }

    public function store($request) {


        try {

            Command::create([
                'num_command' => $request->num_command,
                'nom_commerciale' => $request->nom_commerciale,
                'date_command' => $request->date_command,
                'client_id' => $request->client_id,
                'bank_id' => $request->bank_id,
                'marque' => $request->marque,
                'version' => $request->version,
                'couleur' => $request->couleur,
                'price' => $request->price,
                // 'num_vn' => $request->num_vn,
            ]);

            $command_id = Command::latest()->first()->id;
            Car::create([
                'command_id' => $command_id,
                'marque' => $request->marque,
                'version' => $request->version,
                'couleur' => $request->couleur,
                'price' => $request->price,
                // 'num_vn' => $request->num_vn,
            ]);

            return redirect()->route('commands.index');
        }

        catch (\Exception $e){
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        $commands = Command::where('id',$id)->first();
        $cars  = Car::where('command_id',$id)->get();
        return view('Dashboard.commands.show', compact('commands','cars'));
    }

    public function edit($id)
    {
        $clients = Client::all();
        $banks = Bank::all();
        $commands = Command::findorfail($id);
        return view('Dashboard.commands.edit', compact('commands','clients','banks'));
    }

    public function update($request)
    {

        try {

            $commands = Command::findOrFail($request->command_id);
            $commands->update([
                'num_command' => $request->num_command,
                'nom_commerciale' => $request->nom_commerciale,
                'date_command' => $request->date_command,
                'client_id' => $request->client_id,
                'bank_id' => $request->bank_id,
                'marque' => $request->marque,
                'version' => $request->version,
                'couleur' => $request->couleur,
                'price' => $request->price,
                // 'num_vn' => $request->num_vn,
            ]);
            $cars = Car::findOrFail($request->command_id);
            $cars->update([
                'marque' => $request->marque,
                'version' => $request->version,
                'couleur' => $request->couleur,
                'price' => $request->price,
                // 'num_vn' => $request->num_vn,
            ]);

            return redirect()->route('commands.index');

        }
        catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy($request)
    {
        Command::findOrFail($request->id)->delete();
        return redirect()->route('commands.index');
    }

}
