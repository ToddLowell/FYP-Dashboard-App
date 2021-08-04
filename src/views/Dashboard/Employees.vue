<template>
  <Loading :loading="loading" />
  <AddUser v-if="toggleAddUser" @toggle="toggleAddUser = $event" @reload="loadUsers" />
  <div class="container">
    <Button class="add-new" @click="toggleAddUser = !toggleAddUser">Add Employee</Button>
    <table class="rwd-table">
      <tr>
        <th>Email Address</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Checked In</th>
        <th>Actions</th>
      </tr>
      <tr v-for="row in rows" :key="row.user_id">
        <td data-th="Email Address">{{ row.email }}</td>
        <td data-th="First Name">{{ row.first_name }}</td>
        <td data-th="Last Name">{{ row.last_name }}</td>
        <td data-th="Checked In">n/a</td>
        <td data-th="Actions" class="center">
          <span class="pointer red">
            <mdicon name="delete" />
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Button from '../../components/FormButton.vue';
import Loading from '../../components/Loading.vue';
import AddUser from '../../components/AddUser.vue';
import axios from '../../axios';

export default defineComponent({
  components: {
    Button,
    Loading,
    AddUser,
  },
  setup() {
    const loading = ref(false);
    const rows = ref([]);
    const toggleAddUser = ref(false);

    onMounted(() => {
      loadUsers();
    });

    const loadUsers = () => {
      loading.value = true;
      axios
        .get('/users')
        .then((data) => (rows.value = data.data))
        .catch((err) => alert(err.response.data))
        .finally(() => (loading.value = false));
    };

    return {
      loading,
      rows,
      toggleAddUser,
      loadUsers,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/mixins' as *;

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  min-width: 300px;
  max-width: 900px;
}

.pointer {
  cursor: pointer;
}

.red {
  color: crimson;
}

.add-new {
  display: inline-block;
  margin-left: auto;
  background: var(--clr-secondary-400);

  &:hover {
    background: var(--clr-secondary-700);
  }
}

.rwd-table {
  margin: 2rem auto;
  width: 100%;

  tr {
    border-top: 10px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    display: none;
  }

  td {
    display: block;

    &:first-child {
      padding-top: 0.5em;
    }
    &:last-child {
      padding-bottom: 0.5em;
    }

    &:before {
      content: attr(data-th) ': ';
      font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options

      @include mq-min(tab-port) {
        display: none;
      }
    }
  }

  th,
  td {
    text-align: left;

    @include mq-min(tab-port) {
      display: table-cell;
      padding: 0.25em 0.5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }

  td.center {
    text-align: center;

    @include mq(tab-port) {
      text-align: left;
    }
  }
}

// presentational styling
.rwd-table {
  background: var(--clr-primary-200);
  color: #fff;
  border-radius: 6px;
  overflow: hidden;

  tr {
    border-color: lighten(#34495e, 10%);
  }

  th,
  td {
    margin: 0.5em 1em;
    @include mq-min(tab-port) {
      padding: 1em !important;
    }
  }

  th,
  td:before {
    color: var(--clr-secondary-400);
    font-size: 1.2em;
  }
}
</style>
