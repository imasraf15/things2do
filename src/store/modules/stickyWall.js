const stickyWall = {
  namespaced: true,

  state: {
    stickyList: loadSticky(),
    stickyForm: loadEmptyStickyFromData(),
    isShowStickyForm: false    
  },

  actions: {
    async saveStickyDataAction({ commit, state }, stickyId) {
      if (stickyId == 0) {
        state.stickyForm.stickyId = Math.floor((Math.random() * 100) + 3 );
        await commit('updateStickyListMutation', state.stickyForm);
        return
      }
      else {
          let index = state.stickyList.findIndex(sticky => sticky.stickyId == stickyId)
          if (index !== -1) {
              state.stickyList.splice(index, 1);    
          }
          await commit('updateStickyListMutation', state.stickyForm);
          return
      }
    },
    async editStickyDataAction({ commit, state }, stickyId) {
      let filteredList = state.stickyList.find(list => list.stickyId == stickyId);
      if (filteredList) {
          await commit('editStickyDataMutation', filteredList);
          return
      }
    },
    async deleteStickyDataAction({ commit, state }, stickyId) {
      let index = state.stickyList.findIndex(list => list.stickyId == stickyId)
      if (index !== -1) {
          await commit('deleteStickyListMutation', index);
          return
      }
      
    },
  }, 
  
  mutations: {
    updateStickyDataMutation(state, payload) {
      state.stickyForm[payload.name] = payload.value;
    },
    updateStickyListMutation(state, data) {
      state.stickyList.push(data);
      state.stickyList.sort((a, b) => a.stickyId - b.stickyId);

    },
    updateShowStickyFormStatusMutation(state, value) {
      state.isShowStickyForm = value;
    },
    clearStickyFormStatusMutation(state) {
      state.stickyForm = loadEmptyStickyFromData();
    },
    editStickyDataMutation(state, value) {
      state.stickyForm = value;
    },
    deleteStickyListMutation(state, index) {
      state.stickyList.splice(index, 1);
    },
    updateShowFullPageStickyMutation(state, payload) {
      state.stickyList.map(list => {
        if (list.stickyId == payload.stickyId) {
          return list.showFullPageSticky = payload .value 
        }
      });
    }
  }
};

function loadSticky() {
  return [
    {
      stickyId: 1,
      stickyName: "Today's Tasks",
      stickyMessage: "<ol><li>Finish the presentation for the team meeting at 2:00 PM.</li><li>Call Sarah to discuss the project timeline.</li><li>Grocery shopping - don't forget to buy milk, eggs, and bread.</li><li>Schedule a dentist appointment for next week.</li><li><strong>Complete the online course on web development.</strong></li></ol>",
      stickyColor: "#FDF2B3",
      showFullPageSticky: false
    },
    {
      stickyId: 2,
      stickyName: "Upcoming Tasks",
      stickyMessage: "<ul><li>Review and edit the blog post draft by Friday.</li><li>Plan a weekend getaway for your upcoming vacation.</li><li>Pay the monthly bills before the end of the week.</li><li>Organize the garage on Saturday morning.</li><li>RSVP for the company's annual dinner by the end of the day.</li></ul>",
      stickyColor: "#D1EAED",
      showFullPageSticky: false
    },
    {
      stickyId: 3,
      stickyName: 'Product Showcase',
      stickyMessage: 'Images or carousel showcasing your flagship products or services',
      stickyColor: '#FFDADA',
      showFullPageSticky: false
    },    
  ]
}

function loadEmptyStickyFromData() {
  return {
    stickyId: 0,
    stickyName: '',
    stickyMessage: '',
    stickyColor: '#FDDE6D'
  }
}

export default stickyWall;