@extends('Dashboard.layouts.master')

@section('title')
    Edit Command
@stop

@section('css')

@endsection

@section('content')

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
     <h1>
       Commands
     </h1>
     <ol class="breadcrumb">
       <li><a href="{{ route('dashboard.admin') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
       <li><a href="{{ route('commands.index') }}">Commands</a></li>
       <li class="active">Edit Command</li>
     </ol>
   </section>

   <section class="content">
      <div class="box box-primary">
          <div class="box-header">
              <h3 class="box-title">Edit Command</h3>
          </div>
            <div class="box-body">
                   <form action="{{ route('commands.update','test') }}" method="POST" enctype="multipart/form-data">
                      @csrf
                      {{ method_field('PATCH') }}

                        {{-- 1 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                   <label>Clients</label>
                                   <input type="hidden" value="{{ $commands->id }}" name="command_id">
                                   <select name="client_id" class="form-control">
                                      <option value="" selected disabled>Select Client</option>
                                      @foreach ($clients as $client)
                                        <option value="{{ $client->id }}" {{ $commands->client_id == $client->id ? 'selected' : '' }}>{{ $client->name }}</option>
                                      @endforeach
                                   </select>
                                   <span class="help-block with-errors"></span>
                                </div>
                            </div>
                           <div class="col-md-6">
                              <div class="form-group">
                                <label>Num Command</label>
                                <input type="text" name="num_command" value="{{ $commands->num_command }}" class="form-control" required>
                                <span class="help-block with-errors"></span>
                              </div>
                            </div>
                        </div>
                        {{-- End 1 --}}

                        {{-- 4 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Nom Commerciale</label>
                                    <input type="text" name="nom_commerciale" value="{{ $commands->nom_commerciale }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Date Command</label>
                                    <input type="date" name="date_command" value="{{ $commands->date_command }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>
                        {{-- End 4 --}}

                        <div class="box-header">
                            <h3 class="box-title">Edit Car</h3>
                        </div>

                        {{-- 4 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Marque</label>
                                    <input type="text" name="marque" value="{{ $commands->marque }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Version</label>
                                    <input type="text" name="version" value="{{ $commands->version }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>
                        {{-- End 4 --}}

                        {{-- 4 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Couleur</label>
                                    <input type="text" name="couleur" value="{{ $commands->couleur }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="number" name="price" value="{{ $commands->price }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>
                        {{-- End 4 --}}

                        <br><br>
                        <div class="form-group" style="text-align:center">
                            <button type="submit" class="btn btn-success"><i class="fa fa-floppy-o"></i> Saving Data</button>
                            <a href="{{ route('commands.index') }}" class="btn btn-warning"><i class="fa fa-undo"></i> Back</a>
                        </div>
                    </form>
                </div>
        </div>
   </section>
</div>

@endsection

@section('scripts')

@endsection
