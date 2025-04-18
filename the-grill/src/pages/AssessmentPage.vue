<template>
  <div class="assessment-page">
    <h1>Student Assessment</h1>

    <div class="assessment-form">
      <div class="form-group">
        <label for="studentId">Student ID</label>
        <InputText id="studentId" v-model="assessment.studentId" />
      </div>

      <div class="form-group">
        <label for="subject">Subject</label>
        <Dropdown
          id="subject"
          v-model="assessment.subject"
          :options="['math', 'english']"
          placeholder="Select a subject"
        />
      </div>

      <div v-if="outcomes.length > 0" class="outcomes-section">
        <h2>Assessment Outcomes</h2>
        <div v-for="outcome in outcomes" :key="outcome.id" class="outcome-item">
          <div class="outcome-header">
            <h3>{{ outcome.label }}</h3>
            <p class="description">{{ outcome.description }}</p>
          </div>
          <div class="rating">
            <Rating v-model="assessment.assessmentData[outcome.id]" :stars="5" />
          </div>
        </div>
      </div>

      <Button label="Generate Report Comment" @click="generateComment" :loading="loading" />

      <div v-if="generatedComment" class="generated-comment">
        <h3>Generated Comment</h3>
        <div class="comment-content">
          {{ generatedComment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const outcomes = ref([])
const generatedComment = ref('')
const assessment = ref({
  studentId: '',
  subject: '',
  assessmentData: {},
})

// Watch for subject changes to load relevant outcomes
watch(
  () => assessment.value.subject,
  async (newSubject) => {
    if (newSubject) {
      try {
        const response = await fetch(`/api/assessment-outcomes?subject=${newSubject}`)
        outcomes.value = await response.json()

        // Initialize assessment data for each outcome
        assessment.value.assessmentData = {}
        outcomes.value.forEach((outcome) => {
          assessment.value.assessmentData[outcome.id] = 0
        })
      } catch (error) {
        console.error('Error loading outcomes:', error)
      }
    }
  },
)

async function generateComment() {
  if (!assessment.value.studentId || !assessment.value.subject) {
    alert('Please fill in all required fields')
    return
  }

  loading.value = true
  try {
    const response = await fetch('/api/assessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...assessment.value,
        teacherId: 'current-teacher-id', // This should come from auth context
      }),
    })

    const result = await response.json()
    generatedComment.value = result.aiGeneratedComment
  } catch (error) {
    console.error('Error generating comment:', error)
    alert('Error generating comment. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.assessment-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.assessment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.outcomes-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
}

.outcome-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.outcome-item:last-child {
  border-bottom: none;
}

.outcome-header {
  flex: 1;
}

.outcome-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.description {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.rating {
  margin-left: 1rem;
}

.generated-comment {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.comment-content {
  white-space: pre-wrap;
  line-height: 1.6;
}
</style>
