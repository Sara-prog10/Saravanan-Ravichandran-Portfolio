import React, { useState } from 'react';
import { Post, Skill, Project, TimelineItem, PersonalInfo } from '../types';
import { XIcon } from './icons/Icons';

interface AdminDashboardProps {
    posts: Post[];
    onAddPost: (post: Omit<Post, 'slug'>) => void;
    onUpdatePost: (post: Post) => void;
    onDeletePost: (slug: string) => void;
    onLogout: () => void;
    onNavigateToPortfolio: () => void;
    personalInfo: PersonalInfo;
    onUpdatePersonalInfo: (info: PersonalInfo) => void;
    skills: Skill[];
    onUpdateSkills: (skills: Skill[]) => void;
    projects: Project[];
    onUpdateProjects: (projects: Project[]) => void;
    timeline: TimelineItem[];
    onUpdateTimeline: (timeline: TimelineItem[]) => void;
}

const PostEditor: React.FC<{
    post: Post | Omit<Post, 'slug'> | null;
    onSave: (post: any) => void;
    onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState(post || { title: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-text dark:text-dark-text">{'slug' in formData ? 'Edit' : 'Add'} Post</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-text-muted dark:text-dark-text-muted">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium">Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium">Excerpt</label>
                    <textarea name="excerpt" id="excerpt" value={formData.excerpt} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"></textarea>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
                    <textarea name="content" id="content" value={formData.content} onChange={handleChange} required rows={8} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"></textarea>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-surface-subtle text-text dark:text-dark-text">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Save Post</button>
                </div>
            </form>
        </div>
    );
};

const ProjectEditor: React.FC<{
    project: Project | Omit<Project, 'id'> | null;
    onSave: (project: any) => void;
    onCancel: () => void;
}> = ({ project, onSave, onCancel }) => {
    const initialData = project 
        ? { ...project, tech: Array.isArray(project.tech) ? project.tech.join(', ') : '', tags: Array.isArray(project.tags) ? project.tags.join(', ') : '' }
        : { title: '', shortDescription: '', imageUrl: '', tech: '', tags: '' };
    
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        };
        onSave(finalData);
    };

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-text dark:text-dark-text">{'id' in formData ? 'Edit' : 'Add'} Project</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-text-muted dark:text-dark-text-muted">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium">Short Description</label>
                    <textarea name="shortDescription" id="shortDescription" value={formData.shortDescription} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="tech" className="block text-sm font-medium">Technologies (comma-separated)</label>
                    <input type="text" name="tech" id="tech" value={formData.tech} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium">Tags (comma-separated)</label>
                    <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-surface-subtle text-text dark:text-dark-text">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Save Project</button>
                </div>
            </form>
        </div>
    );
};

const TimelineEditor: React.FC<{
    item: TimelineItem | Omit<TimelineItem, 'id'> | null;
    onSave: (item: any) => void;
    onCancel: () => void;
}> = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState(item || { type: 'work', title: '', organization: '', date: '', description: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-text dark:text-dark-text">{'id' in formData ? 'Edit' : 'Add'} Timeline Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-text-muted dark:text-dark-text-muted">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text">
                        <option value="work">Work</option>
                        <option value="education">Education</option>
                        <option value="certification">Certification</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="organization" className="block text-sm font-medium">Organization</label>
                    <input type="text" name="organization" id="organization" value={formData.organization} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium">Date</label>
                    <input type="text" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"></textarea>
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-surface-subtle text-text dark:text-dark-text">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Save Item</button>
                </div>
            </form>
        </div>
    );
};


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    posts, onAddPost, onUpdatePost, onDeletePost, onLogout, onNavigateToPortfolio, 
    personalInfo, onUpdatePersonalInfo,
    skills, onUpdateSkills,
    projects, onUpdateProjects,
    timeline, onUpdateTimeline
}) => {
    const [editingPost, setEditingPost] = useState<Post | null | 'new'>(null);
    const [editingProject, setEditingProject] = useState<Project | null | 'new'>(null);
    const [editingTimelineItem, setEditingTimelineItem] = useState<TimelineItem | null | 'new'>(null);

    const [profileForm, setProfileForm] = useState(personalInfo);
    const [profileUpdateStatus, setProfileUpdateStatus] = useState<'idle' | 'success'>('idle');
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Language' });


    const handleDeletePost = (slug: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            onDeletePost(slug);
        }
    };

    const handleDeleteProject = (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            onUpdateProjects(projects.filter(p => p.id !== id));
        }
    };
    
     const handleDeleteTimelineItem = (id: number) => {
        if (window.confirm('Are you sure you want to delete this timeline item?')) {
            onUpdateTimeline(timeline.filter(item => item.id !== id));
        }
    };

    const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdatePersonalInfo(profileForm);
        setProfileUpdateStatus('success');
        setTimeout(() => setProfileUpdateStatus('idle'), 2000); // Reset after 2s
    };
    
    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.name.trim() === '' || newSkill.category.trim() === '') return;
        onUpdateSkills([...skills, { name: newSkill.name.trim(), category: newSkill.category.trim() }]);
        setNewSkill({ name: '', category: 'Language' }); // Reset form
    };

    const handleDeleteSkill = (skillNameToDelete: string) => {
        onUpdateSkills(skills.filter(skill => skill.name !== skillNameToDelete));
    };

    if (editingPost) {
        return (
             <div className="min-h-screen bg-surface-subtle dark:bg-dark-surface-subtle py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <PostEditor 
                        post={editingPost === 'new' ? null : editingPost} 
                        onSave={(postData) => {
                            if (editingPost === 'new' || !('slug' in postData)) {
                                onAddPost(postData);
                            } else {
                                onUpdatePost(postData);
                            }
                            setEditingPost(null);
                        }} 
                        onCancel={() => setEditingPost(null)}
                    />
                </div>
            </div>
        )
    }
    
    if (editingProject) {
        return (
             <div className="min-h-screen bg-surface-subtle dark:bg-dark-surface-subtle py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ProjectEditor 
                        project={editingProject === 'new' ? null : editingProject} 
                        onSave={(projectData) => {
                            if (editingProject === 'new' || !('id' in projectData)) {
                                const newProject = { ...projectData, id: Date.now() };
                                onUpdateProjects([...projects, newProject]);
                            } else {
                                onUpdateProjects(projects.map(p => p.id === projectData.id ? projectData : p));
                            }
                            setEditingProject(null);
                        }} 
                        onCancel={() => setEditingProject(null)}
                    />
                </div>
            </div>
        )
    }
    
    if (editingTimelineItem) {
        return (
             <div className="min-h-screen bg-surface-subtle dark:bg-dark-surface-subtle py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <TimelineEditor 
                        item={editingTimelineItem === 'new' ? null : editingTimelineItem} 
                        onSave={(itemData) => {
                            if (editingTimelineItem === 'new' || !('id' in itemData)) {
                                const newItem = { ...itemData, id: Date.now() };
                                onUpdateTimeline([...timeline, newItem].sort((a, b) => b.id - a.id)); // A simple sort, can be improved
                            } else {
                                onUpdateTimeline(timeline.map(item => item.id === itemData.id ? itemData : item));
                            }
                            setEditingTimelineItem(null);
                        }} 
                        onCancel={() => setEditingTimelineItem(null)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-surface-subtle dark:bg-dark-surface-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-6">
                     <h2 className="text-3xl font-bold text-text dark:text-dark-text">Admin Dashboard</h2>
                     <button onClick={onLogout} className="px-4 py-2 rounded-md text-sm font-medium border text-text dark:text-dark-text border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-surface-subtle">Logout</button>
                </div>

                {/* Profile Settings */}
                <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-text dark:text-dark-text">Profile Settings</h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Display Name</label>
                            <input type="text" name="name" id="name" value={profileForm.name} onChange={handleProfileFormChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm text-text dark:text-dark-text" />
                        </div>
                         <div>
                            <label htmlFor="title" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Title</label>
                            <input type="text" name="title" id="title" value={profileForm.title} onChange={handleProfileFormChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm text-text dark:text-dark-text" />
                        </div>
                         <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Bio</label>
                            <textarea name="bio" id="bio" value={profileForm.bio} onChange={handleProfileFormChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm text-text dark:text-dark-text"></textarea>
                        </div>
                        <div>
                            <label htmlFor="profileImageUrl" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Profile Image URL</label>
                            <input type="url" name="profileImageUrl" id="profileImageUrl" value={profileForm.profileImageUrl} onChange={handleProfileFormChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm text-text dark:text-dark-text" />
                        </div>
                        <div>
                            <label htmlFor="resumeUrl" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Resume URL</label>
                            <input type="url" name="resumeUrl" id="resumeUrl" value={profileForm.resumeUrl} onChange={handleProfileFormChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm text-text dark:text-dark-text" />
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Update Profile</button>
                            {profileUpdateStatus === 'success' && <p className="text-green-500 text-sm">Profile updated!</p>}
                        </div>
                    </form>
                </div>

                {/* Skills Management */}
                <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-text dark:text-dark-text">Skills & Expertise</h3>
                    <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row items-end gap-4 mb-6">
                        <div className="flex-grow w-full">
                            <label htmlFor="skillName" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Skill Name</label>
                            <input
                                type="text"
                                id="skillName"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"
                            />
                        </div>
                        <div className="flex-grow w-full">
                            <label htmlFor="skillCategory" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Category</label>
                            <input
                                type="text"
                                id="skillCategory"
                                value={newSkill.category}
                                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-subtle shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-text dark:text-dark-text"
                            />
                        </div>
                        <button type="submit" className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Add Skill</button>
                    </form>
                    <div className="space-y-2">
                        <h4 className="text-md font-semibold text-text dark:text-dark-text">Current Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <div key={skill.name} className="flex items-center gap-2 bg-gray-100 dark:bg-dark-surface-subtle rounded-full px-3 py-1 text-sm">
                                    <span className="font-medium text-text dark:text-dark-text">{skill.name}</span>
                                    <span className="text-text-muted dark:text-dark-text-muted">({skill.category})</span>
                                    <button onClick={() => handleDeleteSkill(skill.name)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Career Path Management */}
                <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-text dark:text-dark-text">Career Path</h3>
                        <button onClick={() => setEditingTimelineItem('new')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Add New Item</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-surface-subtle">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wider">Type</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {timeline.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text dark:text-dark-text">{item.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted dark:text-dark-text-muted capitalize">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button onClick={() => setEditingTimelineItem(item)} className="text-primary hover:underline dark:text-dark-primary">Edit</button>
                                            <button onClick={() => handleDeleteTimelineItem(item.id)} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Projects Management */}
                 <div className="mb-8 bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-text dark:text-dark-text">Featured Projects</h3>
                        <button onClick={() => setEditingProject('new')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Add New Project</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-surface-subtle">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wider">Title</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text dark:text-dark-text">{project.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button onClick={() => setEditingProject(project)} className="text-primary hover:underline dark:text-dark-primary">Edit</button>
                                            <button onClick={() => handleDeleteProject(project.id)} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Blog Posts Management */}
                <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-text dark:text-dark-text">Blog Posts</h3>
                        <button onClick={() => setEditingPost('new')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface">Add New Post</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-surface-subtle">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wider">Date</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {posts.map(post => (
                                    <tr key={post.slug}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text dark:text-dark-text">{post.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted dark:text-dark-text-muted">{post.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button onClick={() => setEditingPost(post)} className="text-primary hover:underline dark:text-dark-primary">Edit</button>
                                            <button onClick={() => handleDeletePost(post.slug)} className="text-red-600 hover:underline dark:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                 <div className="text-center mt-6">
                     <button onClick={onNavigateToPortfolio} className="text-sm text-primary hover:underline bg-transparent border-none p-0 cursor-pointer">Back to Portfolio</button>
                </div>
            </div>
        </div>
    );
};