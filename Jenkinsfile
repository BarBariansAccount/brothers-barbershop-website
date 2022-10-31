pipeline {
    agent any
    tools {
        nodejs 'node-16.13.0'
    }
    stages {
        stage('Build') {
            steps {
                sh 'setup.sh'
            }
        }
        stage('Test') {
            steps {
                dir('barber-website/backend'){
                    sh 'npm test'
                }
            }
        }
        
    }
}
