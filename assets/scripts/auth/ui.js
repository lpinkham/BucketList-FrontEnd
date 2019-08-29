'use strict'

const store = require('../store')
const api = require('./api')
const showBucketTemplate = require('../templates/bucket-list.handlebars')
const showEditBucketTemplate = require('../templates/bucket-list-edit.handlebars')

const signUpSuccessful = responseData => {
  $('#form').trigger('reset')
  // successMessage('You registered successfully')
  showAlert('You have registered successfully.', 'success')
}

const signUpFailure = responseData => {
  $('#form').trigger('reset')
  // failureMessage('We were unable to complete your registration')
  showAlert('You have failed to register. Please try again.', 'danger')
}

const signInSuccessful = responseData => {
  store.user = responseData.user
  $('form').trigger('reset')
  // new modals
  $('#register-btn2').hide()
  $('#sign-in-btn2').hide()
  $('#my-account-btn2').show()
  $('#head-title').css('font-size', '5em')

  $('#Home-Page').hide()
  // $('#Create-A-Bucket').show()
  // $('body').css('color', 'green')
  $('body').removeClass('bg-image')
  $('body').addClass('bg-image2')
  $('#text').hide()
  $('#create-view-buckets').show()

  showAlert('You have logged in successfully', 'success')
}

const signInFailure = responseData => {
  $('form').trigger('reset')
  // failureMessage('Your email or password is incorrect.')
  showAlert('You have failed to sign-in. Please try again.', 'danger')
}

const changePasswordSuccessful = responseData => {
  $('form').trigger('reset')
  // successMessage('You changed your password successfully')
  showAlert('You have changed your password successfully.', 'success')
}

const changePasswordFailure = responseData => {
  $('form').trigger('reset')
  // failureMessage('Please try again. We were unable to change your password')
  showAlert('Please try again. We were unable to change your password.', 'danger')
}

const signOutSuccessful = () => {
  $('form').trigger('reset')
  $('#headingSignInUp').show()
  $('#headingSignoutChangePW').hide()
  $('#message').hide()
  $('#Home-Page').show()
  $('#Create-A-Bucket').hide()
  $('body').addClass('bg-image')
  $('#register-btn2').show()
  $('#sign-in-btn2').show()
  $('#my-account-btn2').hide()
  showAlert('You have logged out successfully', 'success')
  $('#content').hide()
  $('#content2').hide()
  $('#head-title').css('font-size', '10rem')
  $('#text').show()
  $('body').removeClass('bg-image2')
  $('body').addClass('bg-image')
  $('#create-view-buckets').hide()
}

const signOutFailure = () => {
  // failureMessage('Your sign out failed. You are still logged in. Please try again.')
  showAlert('Your sign out failed. You are still logged in. Please try again.', 'danger')
}

// const successMessage = message => {
//   $('#message').show()
//   $('#message').text(message)
//   $('#message').removeClass('failure')
//   $('#message').addClass('success')
//   $('#message').css('color', 'green')
//   $('form').trigger('reset')
// }
//
// const failureMessage = message => {
//   $('#message').show()
//   $('#message').text(message)
//   $('#message').removeClass('success')
//   $('#message').addClass('failure')
//   $('#message').css('color', 'red')
//   $('form').trigger('reset')
// }

// const hideMessage = () => {
//   $('#message').hide()
// }

const createdBucketSuccess = () => {
  // successMessage('created a bucket!')
  showAlert('You have created a new bucket', 'success')

  // run show all buckets and hide create a bucket formData
  $('#Create-A-Bucket').hide()
  api.getYourBuckets()
    .then(getBucketSuccess)
    .catch(getBucketFailure)
}

const createdBucketFailure = () => {
  // failureMessage('created a bucket FAILED!')
  showAlert('Creating a bucket failed. Please try again.', 'danger')
}

// const editBucketUI = (data) => {
//   console.log('data is ', data)
//   const showEditBucketHtml = showEditBucketTemplate({ buckets: data.buckets })
//   $('.content').html('')
//   $('.content2').html(showEditBucketHtml)
//   $('form').trigger('reset')
// }

const getBucketSuccess = (data) => {
  console.log('data inside getBucketSuccess is ', data)
  $('.content').show()
  if (data.buckets.length === 0) {
    // failureMessage('Sorry, you have not created any buckets yet. Please add some and try again.')
    showAlert('Sorry, you have not created any buckets yet. Please add some and try again.', 'danger')
    $('.content').html('')
    $('form').trigger('reset')
  } else {
    // successMessage('Your buckets are listed below.')
    showAlert('Here are your buckets.', 'success')
    const showBucketHtml = showBucketTemplate({ buckets: data.buckets })
    $('.content').html(showBucketHtml)
    $('form').trigger('reset')
    $('#Create-A-Bucket').hide()
  }
}

const getBucketAfterDeleteSuccess = (data) => {
  // console.log('data inside getBucketSuccess is ', data)
  $('.content').show()
  if (data.buckets.length === 0) {
    // failureMessage('Sorry, you have not created any buckets yet. Please add some and try again.')
    showAlert('Sorry, you do not have any buckets now. Please add some.', 'danger')
    $('.content').html('')
    $('form').trigger('reset')
  } else {
    // successMessage('Your buckets are listed below.')
    showAlert('That bucket has been deleted and here is your updated bucket list.', 'success')
    const showBucketHtml = showBucketTemplate({ buckets: data.buckets })
    $('.content').html(showBucketHtml)
    $('form').trigger('reset')
    $('#Create-A-Bucket').hide()
  }
}

const getBucketsAfterUpdateSuccess = (data) => {
  console.log('data inside getBucketsAfterUpdateSuccess is ', data)
  $('.content').show()
  if (data.buckets.length === 0) {
    // failureMessage('Sorry, you have not created any buckets yet. Please add some and try again.')
    showAlert('Sorry, you do not have any buckets now. Please add some.', 'danger')
    $('.content').html('')
    $('form').trigger('reset')
  } else {
    // successMessage('Your buckets are listed below.')
    showAlert('That bucket has been updated and here is your bucket list.', 'success')
    const showBucketHtml = showBucketTemplate({ buckets: data.buckets })
    $('.content').html(showBucketHtml)
    $('form').trigger('reset')
    $('#Create-A-Bucket').hide()
  }
}

const getBucketFailure = responseData => {
  // failureMessage('We were unable to retrieve your buckets.')
  showAlert('We were unable to retrieve your buckets.', 'danger')
  $('form').trigger('reset')
}

const getSingleBucketSuccess = (data) => {
  // console.log('data inside ui.getSingleBucketSuccess is ', data)
  // replace the contents of the section that the id came from with an editable form
  // and pre-load the data.
  $('.content2').html('')
  const showEditBucketHTML = showEditBucketTemplate({ bucket: data.bucket })
  $('.content2').html(showEditBucketHTML)
  $('form').trigger('reset')
}

const getSingleBucketFailure = responseData => {
  // failureMessage('We were unable to retrieve your bucket.')
  showAlert('We were unable to retrieve your bucket.', 'danger')
  $('form').trigger('reset')
}

// used for both delete in handlebars and delete from main page
const deleteBucketSuccess = responseData => {
  // failureMessage('Your bucket has been deleted')
  showAlert('Your bucket has been deleted', 'danger')
  $('form').trigger('reset')
  console.log('right before calling api getYourBuckets after clicking delete')
  api.getYourBuckets()
    .then(getBucketAfterDeleteSuccess)
    .catch(getBucketFailure)
}

const deleteBucketFailure = responseData => {
  // failureMessage('We were unable to delete your bucket.')
  showAlert('We were unable to delete your bucket.', 'danger')
  $('form').trigger('reset')
}

const testShowEditBucketForm = responseData => {
  // console.log('responseData is ', responseData)
  console.log('complete by is ', responseData.bucket.completeBy)
  $('#edit-a-bucket').show()
  $('#edit-bucket-id').val(responseData.bucket._id)
  $('#edit-bucket-title').val(responseData.bucket.title)
  $('#edit-bucket-place').val(responseData.bucket.place)
  $('#edit-bucket-description').val(responseData.bucket.description)
  $('#edit-bucket-shareWith').val(responseData.bucket.shareWith)
  $('#edit-bucket-completeBy').val(responseData.bucket.completeBy)
  $('#edit-bucket-completed').val(responseData.bucket.completed)
  $('.content').hide()
}

// trying to get an edit form in handlebars
const editHandlebarsFunction = responseData => {
  const showEditBucketHTML = showEditBucketTemplate({ bucket: responseData.bucket })
  $(`#${responseData.bucket._id}`).html(showEditBucketHTML)
}

const updateSingleBucketSuccess = responseData => {
  // successMessage('Your bucket has been updated successfully')
  showAlert('Your bucket has been updated successfully', 'success')
  $('form').trigger('reset')
  // need to run get all buckets again
  // show message that bucket updated and all buckets are below
  api.getYourBuckets()
    .then(getBucketsAfterUpdateSuccess)
    .catch(getBucketFailure)
}

const updateSingleBucketFailure = responseData => {
  // failureMessage('We were unable to update your bucket.')
  showAlert('We were unable to update your bucket.', 'danger')
  $('form').trigger('reset')
}

const $messages = $('#messages')

const showAlert = (message, type) => {
  $messages.html(`<p class="alert-${type} alert">${message}</p>`)

  setTimeout(() => $messages.html(''), 3000)
}
const onCreateABucket = () => {
  $('#Create-A-Bucket').show()
}

module.exports = {
  signUpSuccessful,
  signUpFailure,
  signInSuccessful,
  signInFailure,
  changePasswordSuccessful,
  changePasswordFailure,
  signOutSuccessful,
  signOutFailure,
  createdBucketSuccess,
  createdBucketFailure,
  getBucketSuccess,
  getBucketFailure,
  getSingleBucketSuccess,
  getSingleBucketFailure,
  deleteBucketSuccess,
  deleteBucketFailure,
  testShowEditBucketForm,
  updateSingleBucketSuccess,
  updateSingleBucketFailure,
  editHandlebarsFunction,
  onCreateABucket,
  getBucketAfterDeleteSuccess,
  getBucketsAfterUpdateSuccess
}
