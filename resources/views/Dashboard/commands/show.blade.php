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
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab_1">
                <table class="table table-striped" style="text-align:center">
                    <tbody>
                        <tr>
                            <th scope="row">Client Name</th>
                            <td>{{ $commands->client->name }}</td>
                            <th scope="row">Bank Name</th>
                            <td>{{ $commands->bank->name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Num Command</th>
                            <td>{{ $commands->num_command }}</td>
                            <th scope="row">Nom Commerciale</th>
                            <td>{{ $commands->nom_commerciale }}</td>
                            <th scope="row">Date Command</th>
                            <td>{{ $commands->date_command }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Marque</th>
                            <td>{{ $commands->marque }}</td>
                            <th scope="row">Version</th>
                            <td>{{ $commands->version }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Couleur</th>
                            <td>{{ $commands->couleur }}</td>
                            <th scope="row">Price</th>
                            <td>{{ $commands->price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="tab-pane" id="tab_2">
              <table class="table center-aligned-table mb-0 table-hover">
                  <thead>
                      <tr class="text-dark">
                          <th>Marque</th>
                          <th>Version</th>
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
