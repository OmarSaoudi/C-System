@extends('Dashboard.layouts.master')

@section('title')
    Banques
@stop

@section('css')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">

@endsection

@section('content')

    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                Clients
            </h1>
            <ol class="breadcrumb">
                <li><a href="{{ route('dashboard.admin') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
                <li class="active">Banques</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">Banques List <small>{{ $banques->count() }}</small></h3>
                            <br><br>
                            <a class="btn btn-success" data-toggle="modal" data-target="#add"><i class="fa fa-plus"></i> Add</a>
                            <!-- /.box-header -->
                            <div class="box-body">

                                <table id="example" class="display nowrap" style="width:100%">

                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    @foreach($banques as $banque)
                                        <tr>
                                            <td>{{ $loop->index + 1 }}</td>
                                            <td>{{ $banque->name }}</td>

                                        </tr>

                                    @endforeach
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>

                                    </tr>
                                    </tfoot>
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
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.0.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.print.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.colVis.min.js"></script>



    <script>
        $(document).ready(function() {
            $('#example').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print','colvis',
                ]
            } );
        });


    </script>
@endsection

