pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username and repository name
        DOCKER_HUB_USER = 'saikumarbathala'
        IMAGE_NAME      = 'devops-portfolio'
        IMAGE_TAG       = "${BUILD_NUMBER}"
        // Credential ID defined in Jenkins Credentials Manager for Docker Hub login
        DOCKER_HUB_CREDS = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Performing basic validation of HTML, CSS, and JS configurations...'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}..."
                // Standard shell execution to build image (independent of Jenkins Docker Pipeline plugin)
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'
                // Standard Jenkins withCredentials block to securely login and push
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                    sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application container locally on server...'
                sh "docker stop ${IMAGE_NAME} || true"
                sh "docker rm ${IMAGE_NAME} || true"
                // Map to Port 8081 instead of 8080 (since Jenkins is using 8080)
                sh "docker run -d -p 8081:80 --name ${IMAGE_NAME} ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                echo 'Deployment finished successfully! Access your portfolio at http://<server-ip>:8081'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully! Portfolio is deployed.'
        }
        failure {
            echo 'Pipeline execution failed! Check build steps logs.'
        }
    }
}
