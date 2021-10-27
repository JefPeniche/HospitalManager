
pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      steps {
        
        echo "Build ${BUILD_NUMBER}"
        echo 'Building the application'
        
        sh 'npm install'
      }
    }
    
    stage("test") {
      steps {
        
        echo 'Testing the application'
        
        sh 'npm test'
      }
    }
  }
  
  post {
    success {
      echo 'I succeeded!'
      build job: 'jenkins2/main'
    }
    failure {
      echo 'I failed! :('
    }
  }
}
