@extends('Dashboard.layouts.master')

@section('title')
      Details
@stop

@section('css')

@endsection

@section('content')

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
     <h1>
        Details
     </h1>
     <ol class="breadcrumb">
       <li><a href="{{ route('dashboard.admin') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
       <li><a href="{{ route('commands.index') }}">Commands</a></li>
       <li class="active">Details</li>
    </ol>
   </section>

   <section class="content">
    <div class="row">
      <div class="col-xs-12">
       <div class="box">
        <div class="box-header">
             <h3 class="box-title">Car Details</h3>
        </div>
        <br><br>
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab_1" data-toggle="tab">Command Information</a></li>
            <li><a href="#tab_2" data-toggle="tab">Car Information</a></li>
              <li><a href="#tab_3" data-toggle="tab">Car Status</a></li>
              <li><a href="#tab_4" data-toggle="tab"> Payemenet Information</a></li>

          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
                <table class="table table-striped" style="text-align:center">
                    <tbody>
                        <tr>
                            <th scope="row">Nom Commerciale</th>
                            <td>{{ $commands->nom_commerciale }}</td>

                            <th scope="row">Num Command</th>
                            <td>{{ $commands->num_command }}</td>

                            <th scope="row">Date Command</th>
                            <td>{{ $commands->date_command }}</td>


                            <th scope="row">Bank Name</th>
                            <td>{{ $commands->bank->name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Client Name</th>
                            <td>{{ $commands->client->name }}</td>


                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="tab-pane" id="tab_2">
              <table class="table center-aligned-table mb-0 table-hover">
                  <thead>
                      <tr class="text-dark">
                          <th>Marque</th>
                          <th>Finition</th>
                          <th>Couleur</th>
                          <th>Price</th>
                          <th>Created at</th>
                      </tr>
                  </thead>
                  <tbody>
                    @foreach ($cars as $car)
                      <tr>
                          <td>{{ $car->marque }}</td>
                          <td>{{ $car->version }}</td>
                          <td>{{ $car->couleur }}</td>
                          <td>{{ $car->price }}</td>
                          <td>{{ $car->created_at->diffForHumans() }}</td>
                      </tr>
                    @endforeach
                  </tbody>
              </table>
            </div>
              <div class="tab-pane" id="tab_3">
                  <table class="table center-aligned-table mb-0 table-hover">
                      <thead>
                      <tr class="text-dark">
                          <th>Carte Jaune</th>
                          <th>Date D'arrivée</th>
                          <th>Date Livraison</th>
                          <th>Date Dossier</th>
                      </tr>
                      </thead>
                      <tbody>
                      @foreach ($cars as $car)
                          <tr>
                              <td><div>    <input type="date" name="date_command" value="{{ date('Y-m-d') }}" class="form-control" required>
                                      <span class="help-block with-errors"></span>
                                  </div> </td>
                              <td><div>    <input type="date" name="date_command" value="{{ date('Y-m-d') }}" class="form-control" required>
                                      <span class="help-block with-errors"></span>
                                  </div> </td>
                              <td><div>    <input type="date" name="date_command" value="{{ date('Y-m-d') }}" class="form-control" required>
                                      <span class="help-block with-errors"></span>
                                  </div> </td>
                              <td><div>    <input type="date" name="date_dossier" value="{{ date('Y-m-d') }}" class="form-control" required>
                                      <span class="help-block with-errors"></span>
                                  </div> </td>

                          </tr>
                      @endforeach
                      </tbody>
                  </table>
                  <div class="form-group" style="text-align:center">
                      <button type="submit" class="btn btn-success"><i class="fa fa-floppy-o"></i> Saving Data</button>
                  </div>
              </div>
              <div class="tab-pane" id="tab_4">
                  <table class="table center-aligned-table mb-0 table-hover">
                      <thead>
                      <tr class="text-dark">
                          <th>Acompte information</th>
                          <th>Complement Information</th>
                          <th>Totalité Information</th>
                      </tr>

                      </thead>
                      <tbody>
                      @foreach ($cars as $car)
                          <tr>
                              <td>       <table>

                                      <tbody>
                                      <tr><th scope="row">Bank Name</th>
                                          <td>{{ $commands->bank->name }}</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Num chéque</th>
                                          <td>282815</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Date chéque</th>
                                          <td>28/08/2023</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Montant</th>
                                          <td>16.0000.00</td>
                                      </tr>

                                      </tbody>

                                  </table></td>
                              <td>       <table>

                                      <tbody>
                                      <tr><th scope="row">Bank Name</th>
                                          <td>SGA</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Num chéque</th>
                                          <td>282815</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Date chéque</th>
                                          <td>28/08/2023</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Montant</th>
                                          <td>298.5000.00</td>
                                      </tr>

                                      </tbody>

                                  </table></td>
                              <td>       <table>

                                      <tbody>
                                      <tr><th scope="row">Bank Name</th>
                                          <td>CPA</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Num chéque</th>
                                          <td>282815</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Date chéque</th>
                                          <td>28/08/2023</td>
                                      </tr>
                                      <tr>
                                          <th scope="row">Montant</th>
                                          <td>314.5000.00</td>
                                      </tr>

                                      </tbody>

                                  </table>
                              </td>

                          </tr>
                      @endforeach
                      </tbody>
                  </table>
              </div>

          </div>
        </div>
       </div>
      </div>
    </div>
   </section>
</div>

@endsection

@section('scripts')

@endsection
