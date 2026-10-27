<script setup lang="ts">
//library imports
import { ref, defineProps } from "vue";
import { storeToRefs } from "pinia";
// local imports
import { supabase } from "../supabase";
import { useUserStore } from "@/stores/users";
// make visible to template
const userStore = useUserStore();
const { addNewPost } = defineProps<{
  addNewPost: (post: { id: number; content: string; image: string }) => void;
}>();
// Refs
const visible = ref(false);
const caption = ref("");
const file = ref<File | null>(null);
const { user } = storeToRefs(userStore);

// Event Functions
const showModal = () => {
  visible.value = true;
};
const handleOk = async () => {
  if (!file.value) return;
  const fileName = `${Math.floor(Math.random() * 100_000)}`;
  const { data: storageData, error: storageError } = await supabase.storage
    .from("images")
    .upload("public/" + fileName, file.value);

  if (storageError) {
    console.error("Storage upload failed:", storageError);
    return;
  }

  // fetch the auth user’s UUID
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !authUser) {
    console.error("Could not get auth user:", authError);
    return;
  }

  //  insert post using authUser.id (uuid) and pull back the row
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      url: storageData.path,
      caption: caption.value,
      owner_id: authUser.id,
    })
    .select();

  // handle insert result
  if (postError) {
    console.error("Insert into posts failed:", postError);
  } else {
    visible.value = false;
    caption.value = "";
    file.value = null;
  }

  visible.value = false;
  caption.value = "";
  if (postData && postData.length > 0) {
    addNewPost({
      id: postData[0].id,
      content: caption.value,
      image: storageData.path,
    });
  } else {
    console.error("Post data is null or empty.");
  }
};
const handleUploadChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  file.value = input.files?.[0] ?? null;
};
</script>

<template>
  <div>
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <div class="modal-content">
        <label for="fileInput">Choose a photo:</label>
        <input id="fileInput" type="file" accept=".jpeg,.png,.jpg" @change="handleUploadChange" />

        <label for="captionInput">Caption</label>
        <a-input
          id="captionInput"
          v-model:value="caption"
          placeholder="Caption text here…"
          :maxLength="50"
        />
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;

  :deep(label) {
    margin-top: 15px;
  }
}
</style>
