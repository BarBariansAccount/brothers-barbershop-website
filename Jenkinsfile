pipeline {
    agent any
    tools {
        nodejs 'node-16.13.0'
    }
    stages {
        stage('Build') {
            steps {
                sh './ci-cd/docker/clean-up.sh'
                sh './ci-cd/docker/build-test.sh'
            }
        }
        stage('Test') {
            steps {
                sh './ci-cd/docker/test.sh'
            }
        }
        
    }
}
