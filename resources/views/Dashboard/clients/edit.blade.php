   <!-- Edit -->
   <div class="modal fade" id="edit{{ $client->id }}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" style="text-align: center">Client Update</h4>
        </div>
       <div class="modal-body">
        <form action="{{ route('clients.update', 'test') }}" method="POST">
            {{ method_field('patch') }}
            {{ csrf_field() }}
            @csrf

            {{-- 1 --}}
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Client Name</label>
                        <input type="hidden" value="{{ $client->id }}" name="id">
                        <input type="text" name="name" value="{{ $client->name }}" class="form-control" required>
                        <span class="help-block with-errors"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Client Name</label>
                        <select class="form-control" name="type_client_id">
                            <option value="1" {{ $client->type_client_id == 1 ? 'selected' : '' }}>Société</option>
                            <option value="2" {{ $client->type_client_id == 2 ? 'selected' : '' }}>Particuler</option>
                        </select>
                        <span class="help-block with-errors"></span>
                    </div>
                </div>
            </div>
            {{-- End 1 --}}

            {{-- 1 --}}
            <div class="row">
                <div class="col-md-6">
                    <div cass="form-group">
                        <label>Father Name</label>
                        <input type="text" name="father_name" value="{{ $client->father_name }}" class="form-control" required>
                        <span class="help-block with-errors"></span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Mother Name</label>
                        <input type="text" name="mother_name" value="{{ $client->mother_name }}" class="form-control" required>
                        <span class="help-block with-errors"></span>
                    </div>
                </div>
            </div>
            {{-- End 1 --}}

          <div class="modal-footer">
            <button type="submit" class="btn btn-success">Save changes</button>
            <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
          </div>

        </form>
       </div>
      </div>
    </div>
  </div>
 <!-- Edit End -->
