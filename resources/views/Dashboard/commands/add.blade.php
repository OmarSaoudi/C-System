@extends('Dashboard.layouts.master')

@section('title')
    Create Command
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
       <li class="active">Create Command</li>
     </ol>
   </section>

   <section class="content">
      <div class="box box-primary">
          <div class="box-header">
              <h3 class="box-title">Create Command</h3>
          </div>
            <div class="box-body">
                    <form method="POST" action="{{ route('commands.store') }}">
                      @csrf

                        {{-- 1 --}}
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Nom Commerciale</label>
                                    <input type="text" name="nom_commerciale" value="{{ old('nom_commerciale') }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Num Command</label>
                                    <input type="text" name="num_command" value="{{ old('num_command') }}" class="form-control">
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Date Command</label>
                                    <input type="date" name="date_command" value="{{ date('Y-m-d') }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>



                        {{-- End 1 --}}

                        {{-- 2 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Clients</label>
                                    <select name="client_id" class="form-control"  required>
                                        <option value="" selected disabled>Select Client</option>
                                        @foreach ($clients as $client)
                                            <option value="{{ $client->id }}"> {{ $client->name }}</option>
                                        @endforeach
                                    </select>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>


                        </div>

                        {{-- End 2 --}}

                        <div class="box-header">
                            <h3 class="box-title">Car Information</h3>
                        </div>

                        {{-- 3 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                     <label>Marque</label>
                                     <input type="text" name="marque" value="{{ old('marque') }}" class="form-control" required>
                                     <span class="help-block with-errors"></span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                     <label>Version</label>
                                     <input type="text" name="version" value="{{ old('version') }}" class="form-control" required>
                                     <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>
                        {{-- End 3 --}}

                        {{-- 4 --}}
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Couleur</label>
                                    <input type="text" name="couleur" value="{{ old('couleur') }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>

                        </div>
                        {{-- End 4 --}}
                        <div class="box-header">
                            <h3 class="box-title">Payement Information</h3>
                        </div>

                        <div class="row">
                             <div class="col-md-6">
                            <div class="form-group">
                                <label>Banks</label>
                                <select name="bank_id" class="form-control"  required>
                                    <option value="" selected disabled>Select Bank</option>
                                    @foreach ($banks as $bank)
                                        <option value="{{ $bank->id }}"> {{ $bank->name }}</option>
                                    @endforeach
                                </select>
                                <span class="help-block with-errors"></span>
                            </div>
                        </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="number" name="price" value="{{ old('price') }}" class="form-control" required>
                                    <span class="help-block with-errors"></span>
                                </div>
                            </div>
                        </div>

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
