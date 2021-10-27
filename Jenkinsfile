pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Build demo-app'
        sh 'docker build . -t hospitalmanager'
      }
    }

  }
}