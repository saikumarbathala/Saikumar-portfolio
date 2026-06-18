pipeline {
    agent any

    environment {
        // Replace with your Docker Hub registry details
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
                // A DevOps developer can add shell linting commands here, for example:
                // sh 'tidy -e index.html' or similar checkers if configured.
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}..."
                script {
                    dockerImage = docker.build("${Saikumarbathala}/${Portfolio}:${latest}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub and pushing image...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDS) {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application container locally on server...'
                // In a production setup, this step might trigger Ansible, AWS CLI, or kubectl.
                // Here, we run the container on port 8080.
                script {
                    sh "docker stop ${IMAGE_NAME} || true"
                    sh "docker rm ${IMAGE_NAME} || true"
                    sh "docker run -d -p 8080:80 --name ${PORTFOLIO} ${Saikumarbathala}/${latest}:}"
                }
                echo 'Deployment finished successfully!'
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
