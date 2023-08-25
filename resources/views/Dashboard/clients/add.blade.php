<!-- Add Grade -->
<div class="modal fade" id="add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
              <h4 class="modal-title" style="text-align: center">Add Client</h4>
        </div>
        <div class="modal-body">
          <form action="{{ route('clients.store') }}" method="post">
              @csrf
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" name="name" id="name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Father Name</label>
                    <input type="text" name="father_name" id="father_name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Mother Name</label>
                    <input type="text" name="mother_name" id="mother_name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Type Client</label>
                    <select name="type_client_id" class="form-control" required>
                       <option value="" selected disabled>Select Type Client</option>
                       @foreach ($type_clients as $type_client)
                           <option value="{{ $type_client->id }}"> {{ $type_client->name }}</option>
                       @endforeach
                    </select>
                    <span class="help-block with-errors"></span>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">Save changes</button>
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                </div>
          </form>
        </div>
      </div>
    </div>
  </div>
<!-- End Add Grade -->
