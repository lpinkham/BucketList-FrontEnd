'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.signUpSuccessful)
    .catch(ui.signUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccessful)
    .catch(ui.signInFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.changePasswordSuccessful)
    .catch(ui.changePasswordFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccessful)
    .catch(ui.signOutFailure)
}

const onCreateBucket = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.createNewBucket(formData)
    .then(ui.createdBucketSuccess)
    .catch(ui.createdBucketFailure)
}

const onGetYourBuckets = (event) => {
  event.preventDefault()
  api.getYourBuckets()
    .then(ui.getBucketSuccess)
    .catch(ui.getBucketFailure)
}

// this delete is used in handlebars. It only needs the id, there is no form.
const onDeleteYourBucket = (event) => {
  const id = $(event.target).closest('section').data('id')
  api.deleteBucketHandlebars(id)
    .then(ui.deleteBucketSuccess)
    .catch(ui.deleteBucketsFailure)
}

const onUpdateBucket = (event) => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.updateBucket(formData)
    .then(ui.updateSingleBucketSuccess)
    .catch(ui.updateBucketFailure)
}

// used in handlebars edit button
const onEditBucket = (event) => {
  // get the id by from the section that has the bucket id as data-id
  const id = $(event.target).closest('section').data('id')
  api.getSingleBucket(id)
    .then(ui.editHandlebarsFunction)
    .catch(ui.onUpdateBucket)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateBucket,
  onGetYourBuckets,
  onUpdateBucket,
  onEditBucket,
  onDeleteYourBucket
}
