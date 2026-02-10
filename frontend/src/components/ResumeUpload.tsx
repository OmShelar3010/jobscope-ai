import React, { useState } from 'react';
import api from '../utils/api';

interface ResumeUploadProps {
    onUploadSuccess: (skills: string[]) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setUploading(true);
        setMessage('');

        try {
            const { data } = await api.post('/users/resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Resume parsed successfully! Skills updated.');
            onUploadSuccess(data.skills);
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Failed to upload resume.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Auto-fill from Resume</h3>
            <div className="flex flex-col space-y-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`bg-indigo-600 text-white px-4 py-2 rounded-md transition ${(!file || uploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                >
                    {uploading ? 'Parsing...' : 'Upload & Extract Skills'}
                </button>
                {message && (
                    <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
