import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VoteButton from './VoteButton';
import { ChakraProvider } from '@chakra-ui/react';

describe('VoteButton Component', () => {
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();
    const mockNeutralizeVote = vi.fn();

    const props = {
        id: '1',
        authUser: 'user1',
        upVote: mockUpVote,
        downVote: mockDownVote,
        neutralizeVote: mockNeutralizeVote,
        upVotesBy: ['user1'],
        downVotesBy: ['user2'],
    };

    it('should render correctly', () => {
        const { getByText, getByRole } = render(
            <ChakraProvider>
                <VoteButton {...props} />
            </ChakraProvider>
        );

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByRole('button', { name: /AiFillLike/i })).toBeInTheDocument();
        expect(getByRole('button', { name: /AiOutlineDislike/i })).toBeInTheDocument();
    });

    it('should call upVote when clicking on the upvote button', () => {
        const { getByRole } = render(
            <ChakraProvider>
                <VoteButton {...props} upVotesBy={[]} />
            </ChakraProvider>
        );

        fireEvent.click(getByRole('button', { name: /AiOutlineLike/i }));
        expect(mockUpVote).toHaveBeenCalledWith('1');
    });

    it('should call downVote when clicking on the downvote button', () => {
        const { getByRole } = render(
            <ChakraProvider>
                <VoteButton {...props} downVotesBy={[]} />
            </ChakraProvider>
        );

        fireEvent.click(getByRole('button', { name: /AiOutlineDislike/i }));
        expect(mockDownVote).toHaveBeenCalledWith('1');
    });

    it('should call neutralizeVote when clicking on the neutralize button', () => {
        const { getByRole } = render(
            <ChakraProvider>
                <VoteButton {...props} />
            </ChakraProvider>
        );

        fireEvent.click(getByRole('button', { name: /AiFillLike/i }));
        expect(mockNeutralizeVote).toHaveBeenCalledWith('1');
    });

    it('should display correct number of upvotes', () => {
        const { getByText } = render(
            <ChakraProvider>
                <VoteButton {...props} />
            </ChakraProvider>
        );

        expect(getByText('1')).toBeInTheDocument();
    });

    it('should display correct number of downvotes', () => {
        const { getByText } = render(
            <ChakraProvider>
                <VoteButton {...props} />
            </ChakraProvider>
        );

        expect(getByText('1')).toBeInTheDocument();
    });
});
