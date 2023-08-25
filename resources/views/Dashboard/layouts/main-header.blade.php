<header class="main-header">
    <!-- Logo -->
    <a href="index2.html" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>A</b>LT</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Admin</b>LTE</span>
    </a>

    <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>

    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <li class="dropdown tasks-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              @if (App::getLocale() == 'ar'){{ LaravelLocalization::getCurrentLocaleName() }} <img src="{{ URL::asset('Dashboard/assets/flags/DZ.png') }}" alt="">
              @else {{ LaravelLocalization::getCurrentLocaleName() }} <img src="{{ URL::asset('Dashboard/assets/flags/US.png') }}" alt="">
              @endif
            <ul class="dropdown-menu" style="width:20%;text-align:center">
              <li>
                  <ul class="menu">
                    {{-- @foreach(LaravelLocalization::getSupportedLocales() as $localeCode => $properties)
                    <a class="dropdown-item" rel="alternate" hreflang="{{ $localeCode }}"
                       href="{{ LaravelLocalization::getLocalizedURL($localeCode, null, [], true) }}">
                        @if($properties['native'] == "English")
                            <i class="fa fa-gears"></i>
                        @elseif($properties['native'] == "العربية")
                            <i class="fa fa-gears"></i>
                        @endif
                        {{ $properties['native'] }}
                    </a>
                    @endforeach --}}
                      @foreach(LaravelLocalization::getSupportedLocales() as $localeCode => $properties)
                        <li>
                          <a rel="alternate" hreflang="{{ $localeCode }}" href="{{ LaravelLocalization::getLocalizedURL($localeCode, null, [], true) }}">
                              {{ $properties['native'] }}
                          </a>
                        </li>
                      @endforeach
                  </ul>
              </li>
            </ul>
        </li>
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="{{ URL::asset('Dashboard/assets/dist/img/user2-160x160.jpg') }}" class="user-image" alt="User Image">
            <span class="hidden-xs">{{ auth()->user()->name }}</span>
          </a>
          <ul class="dropdown-menu">
            <!-- User image -->
            <li class="user-header">
              <img src="{{ URL::asset('Dashboard/assets/dist/img/user2-160x160.jpg') }}" class="img-circle" alt="User Image">

              <p>
                {{ auth()->user()->name }} - Web Developer
                <small>{{ auth()->user()->created_at }}</small>
              </p>
            </li>
            <!-- Menu Body -->

            <!-- Menu Footer-->
            <li class="user-footer">
              <div class="pull-left">
                <a href="" class="btn btn-default btn-flat">Profile</a>
              </div>
              <div class="pull-right">
                @if(auth('web')->check())
                  <form method="POST" action="{{ route('logout.user') }}">
                @elseif(auth('admin')->check())
                  <form method="POST" action="{{ route('logout.admin') }}">
                @else
                  <form method="POST" action="{{ route('logout.doctor') }}">
                @endif
                    @csrf

                    <a href="#" class="btn btn-default btn-flat" onclick="event.preventDefault(); this.closest('form').submit();">Log Out</a>
                  </form>
              </div>
            </li>
          </ul>
        </li>
        <!-- Control Sidebar Toggle Button -->
        <li>
          <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</header>

