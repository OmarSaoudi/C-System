@extends('Dashboard.layouts.master')

@section('title')
    Commands
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
      <li class="active">Commands</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">Commands List <small>{{ $commands->count() }}</small></h3>
            <br><br>
            <a href="{{ route('commands.create') }}" class="btn btn-success"><i class="fa fa-plus"></i> Add</a>
          <!-- /.box-header -->
          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Num Command</th>
                <th>Nom Commerciale</th>
                <th>Date Command</th>
                <th>Created at</th>
                <th>Operation</th>
              </tr>
              </thead>
              <tbody>
              @foreach($commands as $command)
              <tr>
                <td>{{ $loop->index + 1 }}</td>
                <td><a href="{{ url('admin/Cars') }}/{{ $command->id }}">{{ $command->client->name }}</a></td>
                <td>{{ $command->num_command }}</td>
                <td>{{ $command->nom_commerciale }}</td>
                <td>{{ $command->date_command }}</td>
                <td>{{ $command->created_at->diffForHumans() }}</td>
                <td>
                    <a href="{{ route('commands.edit', $command->id) }}" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete{{ $command->id }}"><i class="fa fa-trash"></i></a>
                </td>
              </tr>
              @include('Dashboard.commands.delete')
              @endforeach
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</div>


@endsection


@section('scripts')

@endsection
