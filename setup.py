from setuptools import setup, find_packages

setup(
    name="nutriai",
    version="0.1.0",
    description="NutriAI - AI-powered nutrition analysis",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "pydantic",
        "passlib[bcrypt]",
        "python-jose[cryptography]",
        "python-multipart",
        "scikit-learn",
        "pandas",
        "numpy",
        "email-validator",
    ],
    python_requires=">=3.11",
)