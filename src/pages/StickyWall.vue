<template>
  <SkeletonCard v-if="stickyPageLoader"/>
  <div class="d-flex justify-content-between" v-else>
    <div class="w-100 p-3">
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary t2d-btn" @click="addNewSticky">Add New Sticky</button>
      </div>
      <div class="card p-3 pb-0">
          <div class="row">
            <div v-for="(sticky, index) in stickyList" :key="index" class="col-lg-4 col-sm-6 col-12">
              <div class="p-3 rounded-3 shadow-sm mb-3 sticky-card" :style="{ background: sticky.stickyColor }"
              :class="sticky.showFullPageSticky ? 'fullpage-sticky' : ''">
              <div class="d-flex justify-content-between align-items-center">
                <h4 @click="editSticky(sticky.stickyId)" class="cursor-pointer sticky-name">{{ sticky.stickyName }}</h4>
                <div class="d-flex justify-content-between align-items-center sticky-wall-button-panel">
                  <img src="@/assets/images/svg/expand-arrow.svg" class="p-2 me-2 cursor-pointer" 
                    @click="isShowFullPageSticky(sticky.stickyId, true)" v-if="!sticky.showFullPageSticky"/>
                  <img src="@/assets/images/svg/collapse-arrow.svg" class="p-2 me-2 cursor-pointer"
                    @click="isShowFullPageSticky(sticky.stickyId, false)" v-else />
                  <img src="@/assets/images/svg/trash.svg" class="p-2 cursor-pointer" v-if="!sticky.showFullPageSticky"
                    @click="deleteSticky(sticky.stickyId)"/>
                </div>
              </div>
              <div v-html="sticky.stickyMessage" ></div>
          </div>
        </div>
          </div>
        </div>
    </div>
    <div v-if="isShowStickyForm" :key="componentKey">
      <AppRightBar>      
        <template  v-slot:slot-body>
          <SkeletonFrom  v-if="stickyFormLoader"/>
          <StickyForm v-else />
        </template>
      </AppRightBar>
    </div>
  </div>
</template>

<script setup>
import AppRightBar from "@/components/shared/AppRightBar.vue";
import StickyForm from "@/components/stickyWall/StickyForm.vue";
import { computed, onMounted, ref  } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2'
import SkeletonFrom from "@/components/shared/skeleton/SkeletonFrom.vue"
import SkeletonCard from "@/components/shared/skeleton/SkeletonCard.vue"

const componentKey = ref(0);
const stickyFormLoader = ref(false);
const stickyPageLoader = ref(false);
const store = useStore();

onMounted(() => {
  stickyPageLoader.value = true;
  store.commit('stickyWall/updateShowStickyFormStatusMutation', false);
  setTimeout(() => {
    stickyPageLoader.value = false;
  }, 1000);
})

const stickyList = store.state.stickyWall.stickyList;

let isShowStickyForm = computed(function () {
    return store.state.stickyWall.isShowStickyForm
});

const addNewSticky = () => {
  stickyFormLoader.value = true;
  componentKey.value += 1;
  store.commit('stickyWall/clearStickyFormStatusMutation');
  store.commit('stickyWall/updateShowStickyFormStatusMutation', true);
  setTimeout(() => {
    stickyFormLoader.value = false;
  }, 1000);
};

const editSticky = (stickyId) => {
  stickyFormLoader.value = true;
  store.commit('stickyWall/updateShowFullPageStickyMutation', {stickyId: stickyId, value: false});
  componentKey.value += 1;
  store.dispatch('stickyWall/editStickyDataAction', stickyId);
  store.commit('stickyWall/updateShowStickyFormStatusMutation', true);
  setTimeout(() => {
    stickyFormLoader.value = false;
  }, 1000);
};

const deleteSticky = (stickyId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#484848',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('stickyWall/deleteStickyDataAction', stickyId);
      Swal.fire({     
        title: 'Deleted!',
        text: "Sticky has been deleted.",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })
}

const isShowFullPageSticky = (stickyId, value) => {
  store.commit('stickyWall/updateShowStickyFormStatusMutation', false);
  store.commit('stickyWall/updateShowFullPageStickyMutation', {stickyId: stickyId, value: value});
}
</script>
