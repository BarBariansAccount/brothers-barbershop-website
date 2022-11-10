pipeline {
    agent any
    tools {
        nodejs 'node-16.13.0'
    }
    stages {
        stage('Build') {
            steps {
                dir('ci-cd/docker'){
                    sh './clean-up.sh'
                    sh './build-test.sh'
                }
            }
        }
        stage('Test') {
            steps {
                dir('ci-cd/docker'){
                    sh './test.sh'
                }
            }
        }
        
    }
}
