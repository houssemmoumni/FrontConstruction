import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { CommentService } from '../services/comment.service';
import { WebsocketService } from '../services/websocket.service';
import { CommentResponse } from '../models/comment-response';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-comments-dialog',
  standalone: true,
  templateUrl: './task-comments-dialog.component.html',
  styleUrls: ['./task-comments-dialog.component.scss'],
  imports: [
    MatDialogModule,
    MatDialogContent,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    DatePipe
  ],
})
export class TaskCommentsDialogComponent implements OnInit, OnDestroy {
  comments: CommentResponse[] = [];
  newComment: string = '';
  editingComment: CommentResponse | null = null;
  private wsSubscription!: Subscription;
  private taskId!: number;
  _comments: any[] = [];
  private commentSub!: Subscription;

  currentUser = {
    id: 3,
    name: 'Project Manager',
    role: 'projectManager',
  };

  constructor(
    public dialogRef: MatDialogRef<TaskCommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private commentService: CommentService,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.taskId = this.data.task?.id;
    if (!this.taskId) {
      console.error('Task ID missing');
      return;
    }

    this.loadComments();



    this.webSocketService.connect(this.taskId);
    this.webSocketService.onComment().subscribe(comment => {
      this.comments.push(comment);
    });
  }

  ngOnDestroy(): void {

    this.webSocketService.disconnect();
  }

  loadComments(): void {
    this.commentService.getCommentsForTask(this.taskId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => console.error('Error loading comments:', error),
    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    const commentText = this.newComment;
    this.newComment = ''; // Clear immediately for better UX

    this.commentService.addComment(this.taskId, commentText, this.currentUser.id).subscribe({
      next: (savedComment) => {
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.newComment = commentText; // Revert if error
      },
    });
  }

  startEditing(comment: CommentResponse): void {
    this.editingComment = { ...comment };
  }

  cancelEdit(): void {
    this.editingComment = null;
  }

  confirmEdit(): void {
    if (!this.editingComment) return;

    this.commentService.updateComment(this.editingComment.id, this.editingComment).subscribe({
      next: (updated) => {
        const index = this.comments.findIndex((c) => c.id === updated.id);
        if (index !== -1) this.comments[index] = updated;
        this.editingComment = null;
      },
      error: (err) => console.error('Error updating comment:', err),
    });
  }

  deleteComment(commentId: number): void {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter((c) => c.id !== commentId);
      },
      error: (err) => console.error('Error deleting comment:', err),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
