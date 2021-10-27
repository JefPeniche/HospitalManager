pipeline {
  
  agent any
  
  stages {
    
    stage("build") {
      steps {
        
        echo 'Building the container'
        
        sh 'docker rm $(docker ps -a -q)'
        
        sh 'docker build . -t hospitalmanager'
        
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
