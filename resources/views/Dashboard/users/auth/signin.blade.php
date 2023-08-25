@extends('Dashboard.layouts.auth')

@section('title')
   Log in
@stop

@section('css')
<style>
    .panel {display: none;}
</style>
@endsection


@section('content_auth')
<div class="login-box">
    <div class="register-logo">
        <a href="#"><b>Admin</b>LTE</a>
    </div>


    <!-- /.login-logo -->
    <div class="login-box-body">
      <div class="form-group">
          <label for="exampleFormControlSelect1">Select</label>
          <select class="form-control" id="sectionChooser">
              <option value="" selected disabled>Choose list</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
          </select>
      </div>

      <div class="panel" id="user">
       <p class="login-box-msg">Login as a user <b></b></p>
       <form action="{{ route('login.user') }}" method="post">
        @csrf
        <div class="form-group has-feedback @error('email') has-error @enderror">
            <input type="email" name="email" class="form-control" placeholder="Email or Phone" required value="{{ old('email') }}" autofocus>
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            @error('email')
                <span class="help-block">{{ $message }}</span>
            @else
            <span class="help-block with-errors"></span>
            @enderror
        </div>
        <div class="form-group has-feedback @error('password') has-error @enderror">
            <input type="password" name="password" class="form-control" placeholder="Password" required>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            @error('password')
                <span class="help-block">{{ $message }}</span>
            @else
                <span class="help-block with-errors"></span>
            @enderror
        </div>
        <div class="row">
            <div class="col-xs-8">
                <div class="checkbox icheck">
                    <label>
                        <input type="checkbox"> Remember Me
                    </label>
                </div>
            </div>
            <!-- /.col -->
            <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
            <!-- /.col -->
        </div>
       </form>
      </div>

      <div class="panel" id="admin">
        <p class="login-box-msg">Login as a admin <b></b></p>
        <form action="{{ route('login.admin') }}" method="post">
         @csrf
         <div class="form-group has-feedback @error('email') has-error @enderror">
             <input type="email" name="email" class="form-control" placeholder="Email or Phone" required value="{{ old('email') }}" autofocus>
             <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
             @error('email')
                 <span class="help-block">{{ $message }}</span>
             @else
             <span class="help-block with-errors"></span>
             @enderror
         </div>
         <div class="form-group has-feedback @error('password') has-error @enderror">
             <input type="password" name="password" class="form-control" placeholder="Password" required>
             <span class="glyphicon glyphicon-lock form-control-feedback"></span>
             @error('password')
                 <span class="help-block">{{ $message }}</span>
             @else
                 <span class="help-block with-errors"></span>
             @enderror
         </div>
         <div class="row">
             <div class="col-xs-8">
                 <div class="checkbox icheck">
                     <label>
                         <input type="checkbox"> Remember Me
                     </label>
                 </div>
             </div>
             <!-- /.col -->
             <div class="col-xs-4">
                 <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
             </div>
             <!-- /.col -->
         </div>
        </form>
      </div>

    </div>
    <!-- /.login-box-body -->

</div>
<!-- /.login-box -->
@endsection


@section('scripts')
    <script>
        $('#sectionChooser').change(function(){
            var myID = $(this).val();
            $('.panel').each(function(){
                myID === $(this).attr('id') ? $(this).show() : $(this).hide();
            });
        });
    </script>
@endsection
