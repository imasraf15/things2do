<template>
  <div>
    <form @submit="saveStickyData">
      <div class="d-flex justify-content-between mb-3">
        <h3 v-if="stickyForm.stickyId == 0">Create Sticky</h3>
        <h3 v-if="stickyForm.stickyId > 0">Edit Sticky</h3>
        <img src="@/assets/images/svg/close.svg" class="p-2 cursor-pointer" @click="closeStickyForm">
      </div>
      <div class="mb-3">
        <label class="mb-1">Choose Sticky Color</label>
        <input type="color" class="form-control form-control-color w-100" id="stickyColor" :value="stickyForm.stickyColor"
          title="Choose Sticky Color" name="stickyColor" @input="updateStickyData($event)">
      </div>
      <div class="mb-3">
        <label class="mb-1">Sticky Name</label>
        <input type="text" class="form-control" id="stickyName" name="stickyName" placeholder="Enter your sticky name"
          :value="stickyForm.stickyName" @input="updateStickyData($event)">
      </div>

      <div class="mb-3">
        <label class="mb-1">Sticky Message</label>
        <QuillEditor theme="snow" v-model:content="stickyForm.stickyMessage" content-type="html" output="html"
          @input="updateStickyData($event)" />
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-primary t2d-btn" type="submit"
          :disabled="!(stickyForm.stickyName && stickyForm.stickyMessage)" @click="saveStickyData">Save</button>
      </div>
      <div class="card text-bg-light mt-3">
        <div class="card-body">
          <p class="card-text"> Please provide a Sticky Name and Sticky Message to enable the save button</p>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup>
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const store = useStore();

const stickyForm = store.state.stickyWall.stickyForm;

const closeStickyForm = () => {
  store.commit('stickyWall/updateShowStickyFormStatusMutation', false);
};

const updateStickyData = (event) => {
  store.commit('stickyWall/updateStickyDataMutation', { name: event.target.name, value: event.target.value });
};

const saveStickyData = () => {
  store.dispatch('stickyWall/saveStickyDataAction', stickyForm.stickyId);
  store.commit('stickyWall/updateShowStickyFormStatusMutation', false);
  Swal.fire({
    icon: 'success',
    title: 'Sticky has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}

</script>
