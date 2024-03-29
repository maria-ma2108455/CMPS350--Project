Swal.fire({
    title: 'Are you sure?',
    text: '......',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33', 
    confirmButtonText: 'Yes!'
 }).then((result) => {
    if(result.value){
     this.props.submitUser(this.state)
   }
 })

 Swal.fire({
    title: add ? 'Added!' : 'Updated!',
    text: add ? 'Item successfully added' : 'Item successfully updated',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d65f83'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `items.html?items=myItems`;
    }
  })