#!/bin/bash

# Parameters
python_executable="python3"
django_settings_module="core.settings"
project_root="$(pwd)"  # Add project root path

# Helper function to run commands with error handling
run_command() {
    echo "Running: $1"
    if ! eval "$1"; then
        echo "Error: Command failed" >&2
        exit 1
    fi
}

echo "Running Django setup..."

# Add Python path configuration
export PYTHONPATH="${PYTHONPATH}:$project_root"
export DJANGO_SETTINGS_MODULE="$django_settings_module"

# Verify manage.py exists
if [ ! -f "manage.py" ]; then
    echo "Error: manage.py not found in current directory!" >&2
    exit 1
fi

# Step 2: Run migrations
echo "Making migrations..."
run_command "$python_executable manage.py makemigrations"

echo "Applying migrations..."
run_command "$python_executable manage.py migrate"

# Step 3: Create superuser
echo "Creating Django superuser..."
read -p "Enter superuser email: " superuser_email
read -s -p "Enter superuser password (input will be hidden): " superuser_password
echo

# Create temporary Python script
temp_python_script=$(mktemp).py
cat << EOF > "$temp_python_script"
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '$django_settings_module')
django.setup()

from django.contrib.auth.models import User

email = "$superuser_email"
password = "$superuser_password"
username = email.split('@')[0]

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser created successfully with username: {username}")
else:
    print("Superuser already exists.")
EOF

echo "Running superuser creation script..."
run_command "$python_executable $temp_python_script"

# Clean up
rm -f "$temp_python_script"

echo "Django setup completed successfully!"
