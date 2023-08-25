<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="{{ asset('Dashboard/assets/dist/img/user2-160x160.jpg') }}" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{ auth()->user()->name }}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
            @if(\Auth::guard('web')->check())
               @include('Dashboard.layouts.main-sidebar.user-sidebar-main')
            @endif
            @if(\Auth::guard('admin')->check())
               @include('Dashboard.layouts.main-sidebar.admin-sidebar-main')
            @endif
      </ul>
    </section>
    <!-- /.sidebar -->
</aside>



