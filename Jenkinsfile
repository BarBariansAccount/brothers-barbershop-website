pipeline {
    agent any
    tools {
        nodejs 'node-16.13.0'
    }
    stages {
        stage('Build') {
            steps {
                def backendImage = docker.build("barbershop:backend", "-f backend-dockerfile ./ci-cd/docker")
                def frontendImage = docker.build("barbershop:frontend", "-f frontend-dockerfile ./ci-cd/docker")
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
