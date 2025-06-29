pipeline {
    agent any
    
    tools {
        maven 'Maven-3.4.0' // Configure in Jenkins Global Tool Configuration
        nodejs 'NodeJS-23.10.0'  // Configure in Jenkins Global Tool Configuration
    }
    
    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        ARTIFACT_NAME = 'learning-management-system'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn clean compile'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn test'
                    publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm run test -- --coverage --watchAll=false'
                }
            }
        }
        
        stage('Package Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'mvn package -DskipTests'
                    archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy backend
                    sh """
                        # Stop existing application
                        pkill -f '${ARTIFACT_NAME}' || true
                        
                        # Copy new JAR
                        cp ${BACKEND_DIR}/target/*.jar /opt/staging/
                        
                        # Start application
                        nohup java -jar /opt/staging/*.jar --server.port=8080 > /opt/staging/app.log 2>&1 &
                    """
                    
                    // Deploy frontend
                    sh """
                        # Copy built frontend to web server
                        rm -rf /var/www/html/staging/*
                        cp -r ${FRONTEND_DIR}/dist/* /var/www/html/staging/
                    """
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
                ok "Deploy"
            }
            steps {
                script {
                    // Similar to staging but for production
                    sh """
                        # Deploy backend to production
                        pkill -f 'prod-${ARTIFACT_NAME}' || true
                        cp ${BACKEND_DIR}/target/*.jar /opt/production/
                        nohup java -jar /opt/production/*.jar --server.port=8080 > /opt/production/app.log 2>&1 &
                        
                        # Deploy frontend to production
                        rm -rf /var/www/html/production/*
                        cp -r ${FRONTEND_DIR}/dist/* /var/www/html/production/
                    """
                }
            }
        }
    }
    
    post {
        success {
            // Simple email notification
            mail to: 'team@company.com',
                subject: "✅ Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build ${env.BUILD_URL} completed successfully with status: ${currentBuild.result}"
            
            // OR Advanced email with HTML template
            emailext (
                subject: "✅ Build Report: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: '''${SCRIPT, template="groovy-html.template"}''',
                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }
        
        failure {
            mail to: 'team@company.com',
                subject: "❌ Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build ${env.BUILD_URL} failed with status: ${currentBuild.result}"
        }
    }
}