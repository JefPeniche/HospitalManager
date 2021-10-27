pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      steps {
        
        echo 'Building the container'
        
        sh 'docker stop test-app'
        
        sh 'docker rm test-app'
        
        sh "docker build . -t hospitalmanager:${BUILD_NUMBER}"
        
        sh "docker tag hospitalmanager:${BUILD_NUMBER} hospitalmanager:latest"
      }
      
    }
    
    stage("run") {
      steps {
        
        echo 'Running the container'
        
        sh 'docker run -d --name test-app --network=host hospitalmanager'
      }
    }
  }
}
