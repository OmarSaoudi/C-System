<?php
namespace App\Repository\Clients;

use App\Interfaces\Clients\ClientRepositoryInterface;
use App\Models\Client;
use App\Models\TypeClient;

class ClientRepository implements ClientRepositoryInterface
{

    public function index()
    {
        $data['type_clients'] = TypeClient::all();
        $clients = Client::all();
        return view('Dashboard.clients.index',$data,compact('clients'));
    }



    public function store($request){

        try {

            $clients = new Client();
            $clients->name = $request->name;
            $clients->father_name = $request->father_name;
            $clients->mother_name = $request->mother_name;
            $clients->type_client_id = $request->type_client_id;
            $clients->save();

            session()->flash('add');
            return redirect()->route('clients.index');

        }
        catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update($request)
    {

        try {


            $clients = Client::findOrFail($request->id);
            $clients->update($request->all());
            $clients->save();
            return redirect()->route('clients.index');
        }
        catch(\Exception $e) {
          return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy($request)
    {
        Client::findOrFail($request->id)->delete();
        return redirect()->route('clients.index');
    }


}
